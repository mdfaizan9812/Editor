// Copy the generated link
function copyLink(){
    let copyButton = $('.generateLinkButton');
    let linkContent = $('.link_box>input');
    copyButton.click(function(){
        linkContent.select();
        navigator.clipboard.writeText(linkContent.val());
        if(copyButton.text() === 'Copy'){
            $.notify('Password Copied',"success");
        }
    });
}


// profile,edit password, logout will be Shown on mouseover on image
function showProfileOption(){
    const info = $('#info');
    const profileImage = $('.profile>img');
    let infoMouseCurser;
    profileImage.mouseover(function(){
        info.removeClass('infoDisplay')
    })
    info.mouseover(function(e){
        infoMouseCurser = e.clientX;
        info.removeClass('infoDisplay')
    })
    profileImage.mouseout(function(){
        setTimeout(()=>{
            // if cursor on info div then info div will not be hide
            if(!infoMouseCurser){
                info.addClass('infoDisplay');
            }
        },2000);
    })
    info.mouseout(function(e){
        info.addClass('infoDisplay')
    })
}


function getLinkFromServer(){
    const linkBox = $('.link_box>input');
    const generateLinkButton = $('.generateLinkButton');
    const inviteFriends = $('.invites');
    const join = $('.join');

    // get link
    generateLinkButton.click(async function(){
        try {
            let data = await axios.get('/users/getlinkFromServer',{headers:{'authorization': `Bearer ${localStorage.getItem('token')}`}});
            
            // keep coming url into inputbox
            linkBox.val(data.data.data.Url);
            if(generateLinkButton.text() === 'Create'){
                $.notify('Link Generated',"success");
            }
            generateLinkButton.text('Copy')
            
            //append the came url into join button
            join.html(`<a href="${data.data.data.Url}" target="_blank"><span><i class="fa fa-users"></i></span> Join</a>`)
            
            inviteFriends.html(`</span><a href="mailto:faizanahmed9801@gmail.com"><span><i class="fa fa-share-alt"></i> Invite Friend</a>`)
            
        } catch (error) {
            $.notify(error.response.data.message,"error");
            console.log('error after token expired',error);
        }
    })
}

function logout(){
    $('#logout').click(function(){
        $.removeCookie('token', { path: '/' });
        localStorage.removeItem('token');
        localStorage.removeItem('ref_token');
        $.notify('Logging out',{ className: "success", position:'top left'});
        setTimeout(()=>{
            location.replace('/users/login');
        },1000);
    })
}




logout();
getLinkFromServer();
copyLink();
showProfileOption();