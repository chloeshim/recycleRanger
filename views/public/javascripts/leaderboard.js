$(() => {
    $("#allFriends").text(friendList.friends.length);
    for(let i = 0;i< friendList.friends.length; i++){
        $("#leaderboard_content").append('<h6><img src="images/user.png" class="frieng_img" ><div style="width:58px; display: inline-block; ">'+ friendList.friends[i] +'</div><img src="images/red-heart.png" height="30" width="30"> </img> '+ friendList.friendHearts[i] +'<a href="cheer_completed?id='+ i +'"><img src="images/cheer_icon.png" class="cheer_img" ></a></h6>');
    }
})