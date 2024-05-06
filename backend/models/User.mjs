/*
 This class holds information about the user

 The constructor takes an object containing all the relevant information making it easy to pass a json directly to it
*/
class User {
    constructor(userObj) {
        this.id = userObj.id;
        this.name = userObj.name;
        this.handle = userObj.handle;
        this.hashedPassword = userObj.hashed-password;
        this.dateRegistered = userObj.date-registered;
        this.email = userObj.email;
        this.bio = userObj.bio;
        this.profilePictureURL = userObj.profile-picture-URL;
        this.followingCount = userObj.following-count;
        this.followerCount = userObj.follower-count;
    }
}

export default User;    