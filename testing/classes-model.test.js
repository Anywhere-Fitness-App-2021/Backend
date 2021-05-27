const Classes = require("../api/classes/classes-model");
const db = require("../db-config");

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

describe("Classes", ()=>{

    it("testing environment is correct", ()=>{

        const result = process.env.NODE_ENV

        expect(result).toBe("testing");
    })

    it("displays a list of classes", async()=>{

        const result = await db("Classes")
        expect(result).toHaveLength(0)

        Classes.addClass({ClassId: 105, Name: "Rehabilitation & Preventative Stretching, Active Movements"})
        const updatedResult = await db("Classes")
        expect(updatedResult).toHaveLength(1)
    })
    it("posts a new class", async()=>{

        const result = await db("Classes")
        expect(result).toHaveLength(0)

        await db("Classes").insert({ClassId: 105, Name: "Rehabilitation & Preventative Stretching, Active Movements"})
        const updatedResult = await db("Classes")
        expect(updatedResult).toHaveLength(1)
    })
    it("deletes a class", async()=>{
        
        const result = await db("Classes")
        expect(result).toHaveLength(0)

        Classes.addClass({ClassId: 105, Name: "Rehabilitation & Preventative Stretching, Active Movements"})
        const updatedResult = await db("Classes")
        expect(updatedResult).toHaveLength(1)

        Classes.deleteClassByClassId(105)
        const finalResult = await db("Classes")
        expect(finalResult).toHaveLength(0);



    })
})