$(() => {
    let id = getUrlParameter('id');
    $("#friendName").text(friendList.friends[id]);
    $("#leaderboard_content").append('<h6><img src="images/user.png" class="frieng_img" ><a href="being_cheered?id='+ id +'"><div style="width:58px; display: inline-block; ">'+ friendList.friends[id] +'</div></a><img src="images/red-heart.png" height="30" width="30"> </img> '+ friendList.friendHearts[id] +'</h6>');
})

let getUrlParameter = function getUrlParameter(sParam) {
    let sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};