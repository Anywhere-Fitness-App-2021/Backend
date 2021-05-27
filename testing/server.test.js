const server = require("../api/server");
const Classes = require("../api/classes/classes-model");
const db = require("../db-config");
const request = require("supertest");

beforeAll(async()=>{
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async()=>{
    await db("Classes").truncate()
})

afterAll(async()=>{
    await db.destroy()
})

describe("[GET] Classes", ()=>{
    beforeEach(async()=>{
        await db("Classes").insert({ClassId: 106, Name: "Rehab & Preventative Stretching"})
        await db("Classes").insert({ClassId: 107, Name: "Group Walk"})
    })

    it("Gets List Of Classes", async()=>{

        const result = await request(server).get("/api/classes")

        expect(result.body).toHaveLength(2)
    })
})

describe("[POST] Classes", ()=>{

    it("Posts new class and returns list with inserted class", async()=>{

        const newClass = {ClassId: 106, Name: "Rehab & Preventative Stretching"}

        await request(server).post("/api/classes").send(newClass)

        const result = await db("Classes")

        expect(result).toHaveLength(1)
    })
})