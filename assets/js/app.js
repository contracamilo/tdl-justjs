//variables

const tweetList = document.getElementById("tweet-list");
const tweetArr = [];
const localStoreKey = "tweets";
const deleteClass = "delete-tweet";

//event listeners

const eventListeners = () => {
	document.getElementById("tweet-form").addEventListener("submit", addTweet);

	tweetList.addEventListener("click", deleteTweet);

	document.addEventListener("DOMContentLoaded", setTweetsFromLocalStorage);
};

//functions

const addTweet = (event) => {
	event.preventDefault();
	const tweet = document.getElementById("tweet").value;
	createList(tweet);
};

const addToLocalStorage = (name, tweet) => {
	let tweets;
	tweets = getTweetsFromLocalStorage(localStoreKey);
	tweets.push(tweet);

	localStorage.setItem(name, JSON.stringify(tweets));
};

const getTweetsFromLocalStorage = (name) => {
	const items = localStorage.getItem(name);
	let tweets = items === null ? [] : JSON.parse(items);
	return tweets;
};

const setTweetsFromLocalStorage = () => {
	let tweets;
	tweets = getTweetsFromLocalStorage(localStoreKey);
	addItemList(tweets);
};

const deleteTweetFromLocalStorage = (text) => {
	let formattedText = text.substring(0, text.length - 1);
	let tweets = getTweetsFromLocalStorage(localStoreKey);
	const result = tweets.filter((word) => word != formattedText);

	localStorage.setItem("tweets", JSON.stringify(result));
};

const deleteButton = () => {
	const deleteButton = document.createElement("button");
	deleteButton.classList = deleteClass;
	deleteButton.innerText = "x";
	return deleteButton;
};

const createList = (tweet) => {
	const li = document.createElement("li");
	const deleteBtn = deleteButton();
	li.innerText = tweet;
	li.appendChild(deleteBtn);
	tweetList.appendChild(li);

	addToLocalStorage(localStoreKey, tweet);
};

const addItemList = (list) => {
	const elements = [...new Set(list)];

	elements.forEach((item) => {
		const li = document.createElement("li");
		const deleteBtn = deleteButton();
		li.innerText = item;
		li.appendChild(deleteBtn);
		tweetList.appendChild(li);
	});
};

const deleteTweet = (event) => {
	const item = event.target;
	event.preventDefault();

	if (item.className === deleteClass) {
		item.parentElement.remove();
		deleteTweetFromLocalStorage(item.parentElement.innerText);
	}
};

eventListeners();
