export type QuranDataType = {
    nomor: number
    nama: string
    nama_latin: string
    jumlah_ayat: number
    tempat_turun: string
    arti: string
    deskripsi: string
    audio: string
}

export type SuratDataType = {
    arti?: string
    audio?: string
    ayat?: DetailSuratType[]
    deskripsi?: string
    jumlah_ayat?: number
    nama?: string
    nama_latin?: string
    nomor: number
    status: boolean
    surat_sebelumnya?: Object | boolean
    surat_selanjutnya?: Object
    tempat_turun?: string
}

export type DetailSuratType = {
    ar?: string
    id?: number
    idn?: string
    nomor?: number | any
    surah?: number
    tr?: string | TrustedHTML | undefined | any
}