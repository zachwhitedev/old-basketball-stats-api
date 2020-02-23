// user (coach) schema

id:
email:
password:
firstname:
lastname:

// seasons

// _id:
// coachid: 
// teamIds: []
// season: 'Spring'
// year: '2021'

// ^^^ just let the user do this, i.e. placeholder for team name input = 'Winter 2021 Riverdale Raptors'

//team schema 

id:
name:
coach:

//player schema

id: 
firstname:
lastname:
jersey: 
user_id:
team_id:

// game schema

id:
name:
coachid:
win: true
teamscore: 68
opponentscore: 61

// game events

id:
gameid:
coachid:
playerid:
eventID: 6

eventDictionary = {
    1: 'fg-attempt',
    2: 'fg-success',
    3: 'trey-attempt',
    4: 'trey-success',
    5: 'ft-attempt',
    6: 'ft-success',
    7: 'assist',
    8: 'rebound',
    9: 'block',
    10: 'steal'
}