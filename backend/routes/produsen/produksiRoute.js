// backend/routes/produsen/produksiRoute.js
const express = require('express');
const router = express.Router();
const produksiController = require('../../controllers/produsen/produksiController');
const { authenticateToken } = require('../../middleware/auth');

router.get('/jadwal', authenticateToken, produksiController.getJadwal);
router.get('/riwayat', authenticateToken, produksiController.getRiwayat);
router.get('/:id', authenticateToken, produksiController.getById); // Detail
router.post('/', authenticateToken, produksiController.create);
router.put('/:id', authenticateToken, produksiController.update); // Edit
router.delete('/:id', authenticateToken, produksiController.delete); // Hapus

module.exports = router;