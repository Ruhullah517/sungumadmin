import ImageGrid  from "./imagegrid"

export default function Gallery() {
  return (
    <div className="p-6 bg-[#c2c3c7] min-h-screen">
      <h1 className="text-3xl text-[#293941] font-bold mb-6">Gallery Management</h1>
      <ImageGrid />
    </div>
  )
}

