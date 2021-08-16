const form = document.getElementById('presidential-vote');

//Form-vote submission
form.addEventListener('submit', (e) =>{
    const choice = document.querySelector('input[name=presidential]:checked').value;
    const data = {presidential: choice};

    fetch('http://localhost:4000/poll', {
        method:'POST',
        body: JSON.stringify(data),
        headers: new Headers ({
            'Content-Type': 'application.json'
        })
    })
    .then(res => res.json)
    .catch(err => console.log(err))
 

    e.preventDefault();
});


let dataPoints = [
    {label: 'Original Nakotey', y:0},
    {label: 'Chairman Cyrii', y:0},
    {label: 'Jackie The Script Goddes', y:0},
    {label: 'Salami', y:0},
];

const chartContainer = document.querySelector('#chartContainer');

if (chartContainer){
    const chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled: true,
        theme: 'theme1',
        title: {
            text: 'Presidential Results'
        },
        data: [
            {
                type: 'column',
                dataPoints: dataPoints
            }
        ]
    });

    chart.render();

    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('aa1cefd26c4690b93d17', {
      cluster: 'eu'
    });

    var channel = pusher.subscribe('presidential-poll');
    channel.bind('presidential-vote', function(data) {
      dataPoints = dataPoints.map(x => {
          if(x.label === data.presidential){
              x.y += data.points
              return x;
          } else {
              return x;
          }
      });

      chart.render();
    });
}