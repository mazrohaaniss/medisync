const db = require('../../config/db');

const Produksi = {
  getJadwal: (produsen_id, callback) => {
    const sql = `
      SELECT * FROM produksi 
      WHERE status IN ('Terjadwal', 'Dalam Produksi') AND produsen_id = ?
      ORDER BY tanggal_produksi ASC
    `;
    db.query(sql, [produsen_id], callback);
  },

  getRiwayat: (produsen_id, callback) => {
    const sql = `
      SELECT * FROM produksi 
      WHERE status = 'Selesai' AND produsen_id = ?
      ORDER BY tanggal_produksi DESC
    `;
    db.query(sql, [produsen_id], callback);
  },

  getById: (id, callback) => {
    const sql = 'SELECT * FROM produksi WHERE id = ?';
    db.query(sql, [id], callback);
  },

  create: (data, callback) => {
    const sql = `
      INSERT INTO produksi (
        batch_id, nama_obat, tanggal_produksi, tanggal_kadaluarsa,
        jumlah, prioritas, status, produsen_id, komposisi_obat, dokumen_bpom
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      data.batch_id, data.nama_obat, data.tanggal_produksi, data.tanggal_kadaluarsa,
      data.jumlah, data.prioritas, data.status || 'Terjadwal', data.produsen_id,
      data.komposisi_obat || null, data.dokumen_bpom || null,
    ];
    db.query(sql, values, callback);
  },

  update: (id, data, callback) => {
    const sql = `
      UPDATE produksi 
      SET batch_id = ?, nama_obat = ?, tanggal_produksi = ?, 
          tanggal_kadaluarsa = ?, jumlah = ?, prioritas = ?, status = ?,
          komposisi_obat = ?, dokumen_bpom = ?
      WHERE id = ?
    `;
    const values = [
      data.batch_id, data.nama_obat, data.tanggal_produksi, data.tanggal_kadaluarsa,
      data.jumlah, data.prioritas, data.status, data.komposisi_obat || null,
      data.dokumen_bpom || null, id,
    ];
    db.query(sql, values, callback);
  },

  delete: (id, callback) => {
    const sql = 'DELETE FROM produksi WHERE id = ?';
    db.query(sql, [id], callback);
  },
};

module.exports = Produksi;