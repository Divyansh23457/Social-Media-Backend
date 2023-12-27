import {FriendModel} from '../models/index.model.js'

export default class{
    async getFriendsRepo(userId){
        const relatedFriendRequests = FriendModel.find({$or:[{sender:userId},{receiver:userId}],status:"accepted"})
        // console.log(relatedFriendRequests)
        return relatedFriendRequests;
    }


    async getPendingRequestsRepo(userId){
        const requests = await FriendModel.find({
            receiver : userId,
            status:"pending"
        })
        return requests
    }

    async toggleFriendshipRepo(userId , friendId){
        const friend = await FriendModel.findOne({
            $or: [
              { sender: userId, receiver: friendId },
              { sender: friendId, receiver: userId },
            ],
          });

        if (!friend) {
            const result = await this.sendFriendRequest(userId , friendId)
            return result
        }

        friend.status = friend.status === 'accepted' ? 'rejected' : 'accepted';
        await friend.save();
        return friend
    }

    async sendFriendRequest(userId , friendId){
        const newRequest = new FriendModel({sender : userId, receiver : friendId})
        await newRequest.save()
        return newRequest
    }

    async acceptOrRejectRequest(userId , friendId , status){
            const request = await FriendModel.findOne({
                sender: friendId,
                receiver : userId,
                status:"pending"
            })

            if(!request) return null
            request.status = status
            await request.save()
            return request
            
    }
}