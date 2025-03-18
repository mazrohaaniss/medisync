const Produksi = require('../../models/produsen/produksiModel');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage: storage });

const produksiController = {
  getJadwal: (req, res) => {
    const produsen_id = req.user.id;
    Produksi.getJadwal(produsen_id, (err, results) => {
      if (err) return res.status(500).json({ success: false, message: 'Error fetching jadwal', error: err.message });
      res.json({ success: true, data: results });
    });
  },

  getRiwayat: (req, res) => {
    const produsen_id = req.user.id;
    Produksi.getRiwayat(produsen_id, (err, results) => {
      if (err) return res.status(500).json({ success: false, message: 'Error fetching riwayat', error: err.message });
      res.json({ success: true, data: results });
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    Produksi.getById(id, (err, results) => {
      if (err) return res.status(500).json({ success: false, message: 'Error fetching detail', error: err.message });
      if (!results.length) return res.status(404).json({ success: false, message: 'Data tidak ditemukan' });
      res.json({ success: true, data: results[0] });
    });
  },

  create: [upload.single('dokumen_bpom'), (req, res) => {
    const data = {
      batch_id: req.body.batch_id,
      nama_obat: req.body.nama_obat,
      tanggal_produksi: req.body.tanggal_produksi,
      tanggal_kadaluarsa: req.body.tanggal_kadaluarsa,
      jumlah: req.body.jumlah,
      prioritas: req.body.prioritas,
      status: req.body.status || 'Terjadwal',
      produsen_id: req.user.id,
      komposisi_obat: req.body.komposisi_obat,
      dokumen_bpom: req.file ? req.file.path : null,
    };

    Produksi.create(data, (err, result) => {
      if (err) return res.status(500).json({ success: false, message: 'Error creating production', error: err.message });
      res.status(201).json({
        success: true,
        message: 'Production scheduled successfully',
        data: { id: result.insertId, ...data },
      });
    });
  }],

  update: [upload.single('dokumen_bpom'), (req, res) => {
    const id = req.params.id;
    const data = {
      batch_id: req.body.batch_id,
      nama_obat: req.body.nama_obat,
      tanggal_produksi: req.body.tanggal_produksi,
      tanggal_kadaluarsa: req.body.tanggal_kadaluarsa,
      jumlah: req.body.jumlah,
      prioritas: req.body.prioritas,
      status: req.body.status,
      komposisi_obat: req.body.komposisi_obat,
      dokumen_bpom: req.file ? req.file.path : req.body.dokumen_bpom,
    };

    Produksi.update(id, data, (err, result) => {
      if (err) return res.status(500).json({ success: false, message: 'Error updating production', error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Data tidak ditemukan' });
      res.json({ success: true, message: 'Production updated successfully' });
    });
  }],

  delete: (req, res) => {
    const id = req.params.id;
    Produksi.delete(id, (err, result) => {
      if (err) return res.status(500).json({ success: false, message: 'Error deleting production', error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Data tidak ditemukan' });
      res.json({ success: true, message: 'Production deleted successfully' });
    });
  },
};

module.exports = produksiController;