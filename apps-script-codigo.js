/**
 * Kiago · Guarda las suscripciones de la landing en una Google Sheet.
 *
 * IMPORTANTE: pegá TODO este código en el editor de Apps Script que se abre
 * desde tu planilla (Extensiones → Apps Script). No lo ejecutes desde acá.
 * Los pasos completos están en README-SUSCRIPCION.md.
 */

var ROLE_LABELS = {
  explorador: 'Explorador / Turista',
  dueno: 'Dueño de local'
};

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    var data = JSON.parse(e.postData.contents);
    var email = String(data.email || '').trim();
    var role = String(data.role || '').trim();

    // Validación mínima del lado del servidor
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return json({ ok: false, error: 'Email inválido' });
    }

    // Evita que dos envíos simultáneos pisen la misma fila
    lock.waitLock(10000);

    var sheet = SpreadsheetApp.getActiveSpreadsheet()
      .getSheetByName('Suscripciones');
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Suscripciones');
      sheet.appendRow(['Fecha', 'Email', 'Perfil']);
      sheet.setFrozenRows(1);
    }

    var fecha = Utilities.formatDate(
      new Date(), 'America/Argentina/Buenos_Aires', 'dd/MM/yyyy HH:mm:ss'
    );
    sheet.appendRow([fecha, email, ROLE_LABELS[role] || role]);

    lock.releaseLock();
    return json({ ok: true });
  } catch (err) {
    try { lock.releaseLock(); } catch (_) {}
    return json({ ok: false, error: String(err) });
  }
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
