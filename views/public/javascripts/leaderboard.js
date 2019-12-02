$(() => {
    $("#allFriends").text(friendList.friends.length);
    for(let i = 0;i< friendList.friends.length; i++){
        $("#leaderboard_content").append('<h6 style="margin-bottom:18px;"><img src="images/user.png" class="frieng_img" ><div style="width:98px; display: inline-block; ">'+ friendList.friends[i] +'</div><img src="images/red-heart.png" height="30" width="30"> </img> '+ friendList.friendHearts[i] +'<a href="cheer_completed?id='+ i +'"><div class="cheer_item"><img src="images/cheer_icon.png" class="cheer_img" ><span class="caption">Cheer</span></div></a></h6>');
    }
})