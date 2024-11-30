import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom"
import Swal from "sweetalert2";


export default function AllUser() {
    const initialdData = useLoaderData()
    const [data, setData] = useState(initialdData)
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5001/user/${id}`, {
                    method: "DELETE",
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                    .then(res => res.json())
                    .then(result => {
                        const newData = data.filter(datum => datum._id !== id)
                        setData(newData)
                        console.log(result)
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    })
            }
        });

    }
    return (
        <div className="container mx-auto">
            <h2 className="text-xl font-semibold text-center">Total users: {data.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            data.map((user, index) => <tr className="hover:bg-base-200" key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td className="flex gap-3">
                                    <Link to={`/updateuser/${user._id}`} className="btn btn-sm btn-primary rounded-sm">Edit</Link>
                                    <button className="btn btn-sm btn-error rounded-sm" onClick={() => handleDelete(user._id)}>Delete</button>  {/* Add delete functionality */}
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
