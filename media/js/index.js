const vscode = acquireVsCodeApi();

const channelList = document.getElementById("channel-list");

function renderChannels(channels) {
  channelList.innerHTML = "";

  channels.forEach((channel) => {
    const card = document.createElement("div");
    card.className = "channel";

    card.innerHTML = `
            <div class="channel-name">Channel ${channel.id.toString().padStart(2, "0")}</div>
            <div class="channel-users">${channel.users} online</div>
        `;

    card.onclick = () => {
      vscode.postMessage({
        command: "joinChannel",
        channel: channel.id,
      });
    };

    channelList.appendChild(card);
  });
}

function getTestChannel() {
  const channels = [];

  for (let i = 1; i <= 30; i++) {
    channels.push({
      id: i,
      users: Math.floor(Math.random() * 20),
    });
  }
  return channels;
}

renderChannels(getTestChannel());

// Future: receive updates from extension/backend
window.addEventListener("message", (event) => {
  const message = event.data;

  switch (message.command) {
    case "updateChannels":
      renderChannels(message.channels);
      break;
  }
});
