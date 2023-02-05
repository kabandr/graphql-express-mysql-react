import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { schema } from './Schema'
import cors from 'cors'
import { DataSource } from 'typeorm'
import { Users } from './Entities/Users'
import dotenv from 'dotenv';
dotenv.config()

const PORT = process.env.SERVER_PORT || 3001

const main = async () => {

    // Create DB instance
    const AppDataSource = new DataSource({
        type: "mysql",
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        logging: true,
        synchronize: false,
        entities: [Users]
    });

    // Create DB connection
    await AppDataSource.initialize().then(() => {
        console.log("MySQL connected!")
    }).catch((error) => {
        console.error("Error during DB initialisation", error)
    })

    // Create Express instance
    const app = express()
    app.use(cors())
    app.use(express.json())

    // Create GraphQL server
    app.use("/graphql", graphqlHTTP({
        schema,
        graphiql: true
    }))

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`)
    })
}

main().catch((error) => {
    console.log(error)
})