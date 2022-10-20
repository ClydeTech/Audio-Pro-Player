async function RunCommand(event, command) {
    var url = "http://192.168.1.77/httpapi.asp?command=" + (command ?? event.getAttribute('data-command'))
    return await fetch(url, {
        method: 'GET'
    })
}
async function main() {
    try {
        var response = await RunCommand(null, 'getPlayerStatus')
        var status = await response.json()
    } catch {
        var status = { vol: 20 }
    }

    $("#volumeBar").slider({
        min: 0,
        max: 100,
        value: status.vol,
        range: "min",
        slide: function (event, ui) {
            RunCommand(event, "setPlayerCmd:vol:" + ui.value)
        }
    })

    var listItems = []

    $(stations).each(function (i, item) {
        listItems.push('<div class="station button buttonGreen" onclick="RunCommand(this)" data-command="setPlayerCmd:play:' + item.Url + '">' + item.Title + '</div>')
    })

    $('.stations-container').append(listItems.join(''))
}
main()
