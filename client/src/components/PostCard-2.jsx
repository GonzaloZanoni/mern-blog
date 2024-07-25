/* eslint-disable react/prop-types */
import { Button } from "flowbite-react"
import { Link } from "react-router-dom"

export default function PostCard({ post }) {
    return (
        <div className="group relative w-full dark:border dark:border-purple-500 hover:shadow-custom-purple dark:shadow-none h-[350px] overflow-hidden rounded-lg sm:w-[400px] transition-all shadow-sm">

            <img src={post.image} alt="" className="h-[180px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20" />
            <div className="p-3 flex flex-col gap-2">
                <p className="text-lg font-semibold line-clamp-2">{post.title}</p>
                <span className="text-sm">{post.category}</span>
                <Link to={`/post/${post.slug}`}>
                    <Button gradientDuoTone='purpleToBlue' className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-none text-white hover:bg-purple-500  transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2">
                        Ver Post
                    </Button>
                </Link>
            </div>
        </div>
    )
}
