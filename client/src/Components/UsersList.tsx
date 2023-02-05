import { GET_ALL_USERS } from "../Graphql/Queries"
import { useQuery } from "@apollo/client"

function UsersList() {
    const {data, error} = useQuery(GET_ALL_USERS)  
    return (
        <>
        <h2>Users List</h2>
        {data && data.getAllUsers.map((user: any) => {
            return <div>{user.name} / {user.username} hello</div>
        })}
        </>
    )
}

export default UsersList