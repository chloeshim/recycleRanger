$(() => {
    let id = getUrlParameter('id');
    $("#myName0").text(friendList.friends[id]);
    $("#myName1").text(friendList.friends[id]);
    $("#friendName").text(friendList.friends[id]);
    $("#currentHeartNum").text(friendList.friendHearts[id]);
    $("#heartNum").text(friendList.friendHearts[id]);
    $("#sashaHeart").text(sashaHeart);
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