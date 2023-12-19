import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function createUser(user: any) {
    let res = await prisma.user.create({
        data: user
    })
    console.log(res)
    return res;
}

export async function getUser(email: string) {
    let res = await prisma.user.findUnique({
        where: {
            username: email
        }
    })
    console.log(res)
    return res;
}

export async function getUserById(id: number) {
    let res = await prisma.user.findUnique({
        where: {
            id: id
        }
    })
    console.log(res)
    return res;
}

export const getUserByEmail_Pwd = async (email: string, password: string) => {
    let res = await prisma.user.findUnique({
        where: {
            username: email,
            password: password
        }
    })
    return res;
}