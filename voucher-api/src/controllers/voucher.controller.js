
import mongoose from 'mongoose'
import Voucher from '../models/Voucher.js'

// POST: Menambahkan voucher baru
export const createVoucher = async (req, res) => {
  try {
    const { kode_voucher, persentase_diskon, masih_aktif } = req.body

    if (
      typeof kode_voucher !== 'string' ||
      !kode_voucher.trim() ||
      typeof persentase_diskon !== 'number' ||
      !Number.isFinite(persentase_diskon) ||
      persentase_diskon < 0 ||
      persentase_diskon > 100 ||
      typeof masih_aktif !== 'boolean'
    ) {
      return res.status(400).json({
        message: 'Input tidak valid. Isi kode_voucher (String), persentase_diskon (Number 0-100), dan masih_aktif (Boolean).',
      })
    }

    const voucher = await Voucher.create({
      kode_voucher: kode_voucher.trim(),
      persentase_diskon,
      masih_aktif,
    })

    return res.status(201).json({
      message: 'Voucher berhasil ditambahkan',
      data: voucher,
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: 'Kode voucher sudah digunakan',
      })
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: error.message,
      })
    }

    return res.status(500).json({
      message: 'Terjadi kesalahan pada server',
    })
  }
}

// GET: Menampilkan seluruh voucher
export const getAllVouchers = async (req, res) => {
  try {
    const vouchers = await Voucher.find()

    return res.status(200).json({
      message: 'Data voucher berhasil diambil',
      total: vouchers.length,
      data: vouchers,
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Terjadi kesalahan pada server',
    })
  }
}

// GET: Menampilkan voucher berdasarkan ID
export const getVoucherById = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'Format ID voucher tidak valid',
      })
    }

    const voucher = await Voucher.findById(id)

    if (!voucher) {
      return res.status(404).json({
        message: 'Voucher tidak ditemukan',
      })
    }

    return res.status(200).json({
      message: 'Detail voucher berhasil diambil',
      data: voucher,
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Terjadi kesalahan pada server',
    })
  }
}

// PUT: Memperbarui voucher berdasarkan ID
export const updateVoucher = async (req, res) => {
  try {
    const { id } = req.params
    const { kode_voucher, persentase_diskon, masih_aktif } = req.body

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'Format ID voucher tidak valid',
      })
    }

    if (
      typeof kode_voucher !== 'string' ||
      !kode_voucher.trim() ||
      typeof persentase_diskon !== 'number' ||
      !Number.isFinite(persentase_diskon) ||
      persentase_diskon < 0 ||
      persentase_diskon > 100 ||
      typeof masih_aktif !== 'boolean'
    ) {
      return res.status(400).json({
        message: 'Input tidak valid. Ketiga field wajib diisi dengan tipe data yang benar.',
      })
    }

    const voucher = await Voucher.findByIdAndUpdate(
      id,
      {
        kode_voucher: kode_voucher.trim(),
        persentase_diskon,
        masih_aktif,
      },
      {
        new: true,
        runValidators: true,
      },
    )

    if (!voucher) {
      return res.status(404).json({
        message: 'Voucher tidak ditemukan',
      })
    }

    return res.status(200).json({
      message: 'Voucher berhasil diperbarui',
      data: voucher,
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: 'Kode voucher sudah digunakan',
      })
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: error.message,
      })
    }

    return res.status(500).json({
      message: 'Terjadi kesalahan pada server',
    })
  }
}

// DELETE: Menghapus voucher berdasarkan ID
export const deleteVoucher = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'Format ID voucher tidak valid',
      })
    }

    const voucher = await Voucher.findByIdAndDelete(id)

    if (!voucher) {
      return res.status(404).json({
        message: 'Voucher tidak ditemukan',
      })
    }

    return res.status(200).json({
      message: 'Voucher berhasil dihapus',
      data: voucher,
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Terjadi kesalahan pada server',
    })
  }
}
