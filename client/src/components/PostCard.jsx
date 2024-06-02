/* eslint-disable react/prop-types */
import { Button } from "flowbite-react"
import { Link } from "react-router-dom"

export default function PostCard({ post }) {
    return (
        <div className="group relative w-full dark:border dark:border-green-500 hover:shadow-custom-green dark:shadow-none h-[400px] overflow-hidden rounded-lg sm:w-[430px] transition-all shadow-2xl">

            <img src={post.image} alt="" className="h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20" />
            <div className="p-3 flex flex-col gap-2">
                <p className="text-lg font-semibold line-clamp-2">{post.title}</p>
                <span className="text-sm">{post.category}</span>
                <Link to={`/post/${post.slug}`}>
                    <Button gradientDuoTone='greenToBlue' className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-green-500 text-white hover:bg-green-500  transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2">
                        Read article
                    </Button>
                </Link>
            </div>
        </div>
    )
}
