# Result of execution

## 01. Get Genesis Block
<img src="01. Get Genesis Block.PNG"/>

## 02. Get chain size
<img src="02. Get chain size.PNG"/>

## 03. getBlockByHeight
<img src="03. getBlockByHeight.PNG"/>

## 04. requestOwnership
Param:

     address: 1HZwkjkeaoZfTSaJxDw6aKkxp45agDiEzN

API result:

    1HZwkjkeaoZfTSaJxDw6aKkxp45agDiEzN:1653303758:starRegistry

<img src="04. requestOwnership.PNG"/>


## 06. submitStar
Param:

    address: 1HZwkjkeaoZfTSaJxDw6aKkxp45agDiEzN
    message: 1HZwkjkeaoZfTSaJxDw6aKkxp45agDiEzN:1653303758:starRegistry
    signature: G5nPRIl5tO+R3vqEDnxGtYTDA4xxwCC3SOYbOyFofEKqB1IPwGphlZMprrGlWlBKkEdNWvYAHLDBuyIKyJM2+4A=

API result: like image below

<img src="06. submitStar.PNG"/>

## 07. getStarsByOwner
Param:

     address: 1HZwkjkeaoZfTSaJxDw6aKkxp45agDiEzN

API result:

```json
[
    {
        "address": "1HZwkjkeaoZfTSaJxDw6aKkxp45agDiEzN",
        "star": {
            "ra": "16h 26m 56s",
            "dec": "-26Â° 29' 24.8",
            "story": "Found star using https://www.google.com/sky/"
        },
        "author": "Nguyen Ngoc Nam"
    },
    {
        "address": "1HZwkjkeaoZfTSaJxDw6aKkxp45agDiEzN",
        "star": {
            "ra": "unknown",
            "dec": "unknown",
            "story": "https://www.google.com/intl/en_ALL/sky/#latitude=69.83003273842468&longitude=-36.35780945931275&zoom=11&Spitzer=0.00&ChandraXO=0.00&Galex=0.00&IRAS=0.00&WMAP=0.00&Cassini=0.00&slide=1&mI=-1&oI=-1"
        },
        "author": "Nguyen Ngoc Nam"
    }
]
```

<img src="07. getStarsByOwner.PNG"/>

