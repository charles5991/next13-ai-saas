import { Metadata } from "next"


import { Sidebar } from "@/components/sidebar"

export const metadata: Metadata = {
  title: "Music App",
  description: "Example music app using the components.",
}

export default function HomePage() {
  return (
    <div className="h-full">
      <div className="grid grid-cols-10 h-full">
        <div className="col-span-3 h-full">
          <Sidebar />
        </div>
        <div className="col-span-5 border-l">
          <div className="h-full py-6 px-8">
            Content
          </div>
        </div>
      </div>
    </div>
  )
}