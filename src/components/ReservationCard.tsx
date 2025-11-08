import { fixDateTimeFormat } from '@/lib/utils'
import {
  Calendar,
  CheckCircle,
  Clock,
  Coins,
  GraduationCap,
  LandPlot,
  QrCode,
  Tent,
  UserRoundPlus,
} from 'lucide-react'
import { useRef } from 'react'

function ReservationLayout({
  reservation,
}: {
  reservation: Record<string, any>
}) {
  return (
    <div className="card-body">
      <div className="flex justify-between items-center">
        <h2 className="text-xl">{reservation['Proposed By']}</h2>
        <span className="text-lg text-primary">
          {reservation['Reservation ID']}
        </span>
      </div>
      <span>{reservation['Email Address']}</span>
      <div className="flex gap-2 flex-wrap">
        {reservation['Reservation Status'] === 'confirmed' ? (
          <span className="badge badge-success">
            <CheckCircle size={14} /> Confirmed
          </span>
        ) : (
          <span className="badge badge-warning">
            <Clock size={14} /> Pending
          </span>
        )}
        {reservation['Jenis Anggota'] === 'Alumni' ? (
          <span className="badge badge-info badge-outline">
            <GraduationCap size={18} /> Alumni
          </span>
        ) : (
          <span className="badge badge-success badge-outline">
            <UserRoundPlus size={14} /> Baru
          </span>
        )}
        <span className="badge badge-outline">
          <Tent size={18} /> {reservation['Special Requests']}
        </span>
        <span className="badge badge-outline">
          <LandPlot size={18} /> {reservation['Ukuran Tenda']}
        </span>
      </div>
      <hr className="border border-dashed border-gray-300" />
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Calendar size={16} className="mr-1" />
          <span>{fixDateTimeFormat(reservation['Date Submitted'])}</span>
        </div>
        <div className="flex items-center">
          <Coins size={16} className="mr-1" />
          <span>Payment Method : {reservation['Pilihan Pembayaran']}</span>
        </div>
      </div>
    </div>
  )
}

export default function ReservationCard({
  reservation,
}: {
  reservation: Record<string, any>
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  return (
    <div>
      <div
        className="card card-sm border border-slate-100 bg-base-100 w-full shadow-sm mb-4 hover:shadow-xl cursor-pointer"
        onClick={() => dialogRef.current?.showModal()}
      >
        <ReservationLayout reservation={reservation} />
      </div>

      <dialog ref={dialogRef} className="modal modal-middle sm:modal-middle">
        <div className="modal-box">
          <ReservationLayout reservation={reservation} />
          <div className="modal-action">
            {reservation['Reservation Status'] === 'confirmed' ? (
              <button className="btn btn-success">
                <QrCode size={20} /> Download E-Ticket
              </button>
            ) : (
              <button className="btn btn-warning">
                <Coins size={20} /> Confirm Payment
              </button>
            )}
            <form method="dialog">
              <button className="btn">Close</button>
            </form>          </div>
        </div>
      </dialog>
    </div>
  )
}
