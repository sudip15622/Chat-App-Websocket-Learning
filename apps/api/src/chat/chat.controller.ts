import { Controller, Param, ParseIntPipe, Post } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { Public } from "src/auth/decorators/public.decorator";

@Controller("chat") 
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Public()
    @Post("create/:id")
    createChat(@Param("id", ParseIntPipe) id: number) {
        return this.chatService.create(id);
    }
}