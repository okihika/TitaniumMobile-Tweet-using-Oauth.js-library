Ti.include('oauth.js');
Ti.include('sha1.js');


function get_oauth_token_secret(){

	var oauth_consumer_secret = 'xxxxxx';
	var oauth_consumer_key    = 'xxxxxx';

	var twitter_account   = 'xxxxxx';
	var twitter_password  = 'xxxxxx';
    
	var requestUrl = 'https://api.twitter.com/oauth/access_token';
	var ck  = oauth_consumer_key;
	var cs  = oauth_consumer_secret;
	var accessor = {consumerSecret: cs};
	var message = {
		method: 'POST',
		action: requestUrl,
		parameters: [
			['oauth_signature_method', 'HMAC-SHA1'],
			['oauth_consumer_key', ck],
			['oauth_version', '1.0'],
			['x_auth_username', twitter_account],
			['x_auth_password', twitter_password],   
			['x_auth_mode', 'client_auth'],
			['format', 'json']
		]
	};

	OAuth.setTimestampAndNonce(message);
	OAuth.setParameter(message, 'oauth_timestamp', OAuth.timestamp());
	OAuth.SignatureMethod.sign(message, accessor);
	finalUrl = OAuth.addToURL(message.action, message.parameters);	

	var xhr = Titanium.Network.createHTTPClient();

	xhr.onload = function(){

		//parse response into separate vars
		var uri = this.responseText;
		var queryString = {};
 
		uri.replace(
			new RegExp('([^?=&]+)(=([^&]*))?', 'g'),
			function($0, $1, $2, $3) { queryString[$1] = $3; }
		);

		oauth_token        = queryString['oauth_token'];
		oauth_token_secret = queryString['oauth_token_secret'];
			
	};

	xhr.open('POST', finalUrl);
	xhr.send();
}

function tweet_twitter_api(tweet){

    //application setting
	var oauth_consumer_secret = 'xxxxx';
	var oauth_consumer_key    = 'xxxxx';

    var oauth_token_secret = 'xxxx';
    var oauth_token        = 'xxxx';
    
    var tweet_message = 'xxxx'

	var requestUrl = 'https://api.twitter.com/1/statuses/update.json';
	var accessor = {
		tokenSecret    : oauth_token_secret,
		consumerSecret : oauth_consumer_secret
	};
	var message = {
		method  : "POST",
		action  : requestUrl,
		parameters: [
			['oauth_signature_method', 'HMAC-SHA1'],
			['oauth_consumer_key', oauth_consumer_key],
			['oauth_version', '1.0'],
			['oauth_token', oauth_token],
			['format', 'json'],
			['status', tweet_message]
		]
	};

	OAuth.setTimestampAndNonce(message);
	OAuth.setParameter(message, "oauth_timestamp", OAuth.timestamp());
	OAuth.SignatureMethod.sign(message, accessor);
	var postingUrl = OAuth.addToURL(message.action, message.parameters);

	var xhr = Titanium.Network.createHTTPClient();
	xhr.setTimeout(30000);

	xhr.onload = function(){
		//
    };

	xhr.onsendstream = function(e) {
		//
	};
 
	xhr.open('POST', postingUrl);
	xhr.send();
}

function tweet_twitpic_api(tweet){

	//application setting
	var oauth_consumer_secret = 'xxxx';
	var oauth_consumer_key    = 'xxxx';

    var oauth_token_secret = 'xxxx';
    var oauth_token        = 'xxxx';
    
    var tweet_message = 'xxxx'

	var xhr = Titanium.Network.createHTTPClient();
	xhr.setTimeout(90000);
	
	xhr.onerror = function(e){
		//
	};

	xhr.onload = function(){
		//
    };

	xhr.onsendstream = function(e) {
		//
	};


	var sendImage = Titanium.UI.createImageView({
		image :xxxx,
		width :640,
		height:640
	});
    image = sendImage.toImage();


    xhr.open('POST','http://api.twitpic.com/1/uploadAndPost.json');

	var dev_key = 'xxxxxxxx';
	xhr.send({
		consumer_token  :oauth_consumer_key,
		consumer_secret :oauth_consumer_secret,
		oauth_token     :oauth_token,
		oauth_secret    :oauth_token_secret,
		message         :tweet_message,
		key             :dev_key,
		media:image
	});
}//END of sendTwitpic