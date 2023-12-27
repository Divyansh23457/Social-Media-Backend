import FriendRepository from "../Repositories/friend.Repository.js";
import {FriendModel} from "../models/index.model.js"
import {ObjectId} from 'mongodb'
export  default class{

    constructor(){
        this.friendRepository = new FriendRepository();
    }



    async getFriends(req,res){
        const userId = req.userId
        if(userId != req.params.userId){
            return res.status(400).json({
                success:false,
                message:"Can not fetch friends of another user"
            })
        }
        try{
            const result= await this.friendRepository.getFriendsRepo(userId)
           
            const friendsIds = new Set();
            result.map((item) =>{
              if(item.sender != userId)  friendsIds.add(item.sender)
              if(item.receiver != userId)  friendsIds.add(item.receiver)
            })
            return res.status(200).json({
                success:true,
                friends : Array.from(friendsIds) 
            })
        }catch(err){
            console.log(err)
            console.log("Error while getting friends")
            return res.status(400).json({
                success:false,
                message:"Error while fetching friends"
            })
        }
    }

    async getPendingRequests(req,res){
        const userId = req.userId

        try{
            const result = await this.friendRepository.getPendingRequestsRepo(userId)
            console.log(result)

            return res.status(200).json({
                success:true,
                pendingRequests : result
            })

        }catch(err){
            console.log(err)
            console.log("Error while fetching pending requests")
            return res.status(400).json({
                success:false,
                message:"Error while fetching pending requests"
            })
        }
    }

    async acceptOrRejectPendingRequest(req,res){
        const friendId = req.params.friendId
        const userId = req.userId
        const status = req.body.status
        try{
            const result = await this.friendRepository.acceptOrRejectRequest(userId , friendId , status)
            console.log(result)

            if(!result){
                return res.status(404).json({
                    success:false,
                    message:"Request not found"
                })
            }
            return res.status(200).json({
                success:true,
                updatedRequest : result
            })

        }catch(err){
            console.log(err)
            console.log("Error while accepting/rejecting pending request")
            return res.status(400).json({
                success:false,
                message:"Error while accepting/rejecting pending request"
            })
        }
    }

    async toggleFriendship(req,res){
        const friendId = req.params.friendId
        const userId = req.userId

        if(friendId == userId){
            return res.status(400).json({
                success:false,
                message:"Can not make friends with self"
            })
        }

        try{

            const results = await this.friendRepository.toggleFriendshipRepo(userId,  friendId)
            console.log(results)
            return res.status(200).send({
                success:true,
                request : results
            })
            
        }catch(err){
            console.log(err)
            console.log("Error while toggling pending request")
            return res.status(400).json({
                success:false,
                message:"Error while toggling pending request"
            })
        }
    }
}