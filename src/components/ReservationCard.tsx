import {
  CheckCircle,
  Clock,
  GraduationCap,
  LandPlot,
  Tent,
  UserRoundPlus,
} from 'lucide-react'

export default function ReservationCard({
  reservation,
}: {
  reservation: Record<string, any>
}) {
  return (
    <div className="card card-sm border border-gray-300 bg-base-100 w-full shadow-sm mb-4 hover:shadow-xl cursor-pointer">
      <div className="card-body">
        <h2 className="text-xl">{reservation['Proposed By']}</h2>
        <span>{reservation['Email Address']}</span>
        <hr className="border border-dashed border-gray-300" />
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
        <p className="text-lg">{reservation['Reservation ID']}</p>
      </div>
    </div>
  )
}
