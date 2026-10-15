
import mongoose from 'mongoose'
import Voucher from '../models/Voucher.js'

// POST: Menambahkan voucher
export const createVoucher = async (req, res) => {
    try {
        const { kode_voucher, persentase_diskon, masih_aktif } = req.body

        if (
            typeof kode_voucher !== 'string' ||
            kode_voucher.trim() === '' ||
            persentase_diskon === undefined ||
            persentase_diskon === null
        ) {
            return res.status(400).json({
                success: false,
                message: 'Kode voucher dan persentase diskon wajib diisi',
            })
        }

        if (
            typeof persentase_diskon !== 'number' ||
            !Number.isFinite(persentase_diskon) ||
            persentase_diskon < 0 ||
            persentase_diskon > 100
        ) {
            return res.status(400).json({
                success: false,
                message: 'Persentase diskon harus berupa angka antara 0 dan 100',
            })
        }

        if (masih_aktif !== undefined && typeof masih_aktif !== 'boolean') {
            return res.status(400).json({
                success: false,
                message: 'Status masih_aktif harus berupa boolean',
            })
        }

        const voucher = await Voucher.create({
            kode_voucher: kode_voucher.trim(),
            persentase_diskon,
            masih_aktif,
        })

        return res.status(201).json({
            success: true,
            message: 'Voucher berhasil ditambahkan',
            data: voucher,
        })
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: 'Kode voucher sudah digunakan',
            })
        }

        return res.status(500).json({
            success: false,
            message: 'Gagal menambahkan voucher',
        })
    }
}

// GET: Menampilkan seluruh voucher
export const getAllVouchers = async (req, res) => {
    try {
        const vouchers = await Voucher.find()

        return res.status(200).json({
            success: true,
            message: 'Data voucher berhasil diambil',
            data: vouchers,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Gagal mengambil data voucher',
        })
    }
}

// GET berdasarkan ID
export const getVoucherById = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: 'Format ID voucher tidak valid',
            })
        }

        const voucher = await Voucher.findById(id)

        if (!voucher) {
            return res.status(404).json({
                success: false,
                message: 'Voucher tidak ditemukan',
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Detail voucher berhasil diambil',
            data: voucher,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Gagal mengambil detail voucher',
        })
    }
}

// PUT: Memperbarui voucher
export const updateVoucher = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Format ID voucher tidak valid',
      })
    }

    const allowedFields = [
      'kode_voucher',
      'persentase_diskon',
      'masih_aktif',
    ]

    const updates = {}
    const invalidFields = []

    for (const field of Object.keys(req.body)) {
      if (!allowedFields.includes(field)) {
        invalidFields.push(field)
      } else {
        updates[field] = req.body[field]
      }
    }

    if (invalidFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Terdapat field yang tidak diizinkan',
        fields: invalidFields,
      })
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Minimal satu field harus dikirim untuk diperbarui',
      })
    }

    if (
      'kode_voucher' in updates &&
      (typeof updates.kode_voucher !== 'string' ||
        updates.kode_voucher.trim() === '')
    ) {
      return res.status(400).json({
        success: false,
        message: 'Kode voucher tidak boleh kosong',
      })
    }

    if (
      'persentase_diskon' in updates &&
      (typeof updates.persentase_diskon !== 'number' ||
        !Number.isFinite(updates.persentase_diskon) ||
        updates.persentase_diskon < 0 ||
        updates.persentase_diskon > 100)
    ) {
      return res.status(400).json({
        success: false,
        message: 'Persentase diskon harus berupa angka antara 0 dan 100',
      })
    }

    if (
      'masih_aktif' in updates &&
      typeof updates.masih_aktif !== 'boolean'
    ) {
      return res.status(400).json({
        success: false,
        message: 'Status masih_aktif harus berupa boolean',
      })
    }

    if ('kode_voucher' in updates) {
      updates.kode_voucher = updates.kode_voucher.trim()
    }

    const voucher = await Voucher.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    })

    if (!voucher) {
      return res.status(404).json({
        success: false,
        message: 'Voucher tidak ditemukan',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Voucher berhasil diperbarui',
      data: voucher,
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Kode voucher sudah digunakan',
      })
    }

    return res.status(500).json({
      success: false,
      message: 'Gagal memperbarui voucher',
    })
  }
}

// DELETE: Menghapus voucher
export const deleteVoucher = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Format ID voucher tidak valid',
      })
    }

    const voucher = await Voucher.findByIdAndDelete(id)

    if (!voucher) {
      return res.status(404).json({
        success: false,
        message: 'Voucher tidak ditemukan',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Voucher berhasil dihapus',
      data: voucher,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Gagal menghapus voucher',
    })
  }
}
