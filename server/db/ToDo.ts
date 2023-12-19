import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function createToDo(title: string, description: string, done: boolean, userid: number) {
    let res = await prisma.toDo.create({
        data: {
            title,
            description,
            done,
            user: {
                connect: {
                    id: userid
                }
            }
        }

    })
    console.log(res)
}

export const getTodos = async (userid: number) => {
    let res = await prisma.toDo.findMany({
        where: {
            userId: userid
        }
    })
    return res;
}

export const updateTodo = async (todoId: number) => {
    let res = await prisma.toDo.update({
        where: {
            id: todoId
        },
        data: {
            done: true
        }
    })
    return res;
}