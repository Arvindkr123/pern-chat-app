import { NextFunction, Request, Response } from "express";
import prisma from "../db/prisma.js";

export const sendMessageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message } = req.body;
    const { id: reciverId } = req.params;
    const senderId = req.user.id;

    let conversation = await prisma.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [senderId, reciverId],
        },
      },
    });

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          participantIds: {
            set: [senderId, reciverId],
          },
        },
      });
    }

    const newMessage = await prisma.message.create({
      data: {
        senderId,
        body: message,
        conversationId: conversation.id,
      },
    });

    if (newMessage) {
      conversation = await prisma.conversation.update({
        where: {
          id: conversation.id,
        },
        data: {
          messages: {
            connect: {
              id: newMessage.id,
            },
          },
        },
      });
    }

    res.status(200).json(newMessage);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user.id;

    const conversation = await prisma.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [senderId, userToChatId],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
    if (!conversation) {
      return res.status(200).json([]);
    }
    res.status(200).send(conversation);
  } catch (error: any) {
    console.error("Error while getting message ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserForSidebar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authUserId = req.user.id;
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: authUserId,
        },
      },
      select: {
        id: true,
        fullName: true,
        profilePic: true,
      },
    });
    res.status(200).json(users);
  } catch (error: any) {
    console.error("Error while getting sidebar users ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
