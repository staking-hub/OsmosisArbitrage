import {getSigningOsmosisClient, osmosis} from "osmojs";
import {getWalletFromMnemonic, OsmosisApiClient} from "@cosmology/core";

export let incentive = false;

export const lcdEndPoint = [
    "https://osmosis-api.polkachu.com",
    "https://api.osmosis.interbloc.org",
    "https://lcd.osmosis.zone"
];
export const rpcEndPoint = "https://rpc.osmosis.zone";

export let senderAddr;

const osmosisChainId = "osmosis-1";

const mnemonic = "";
export const chainId = osmosisChainId;

export let maxPathLen;

let signer;
export let stargateClient;
export let api;

export let client;

//all pool > 1000$
export const usefullPools = [
  788,995,1009,1010
]

//all pools 3*slippage < 1% (3$)
export const incentivisedMainnetPools = [
  788,995,1009
];

export const usefullPoolsTestnet = [
    1,2,3,4,5,6,7,8,9,10,11,13,14,15,22,42,183,151,197,461,463,464,481,482,497,547,498,548,549,553,555,557,558,560,561,562,565,567,571,572,573,574,577,578,579,580,584,585,586,587,592,596,597,600,601,602,604,605,606,608,610,611,612,613,614,615,616,617,618,619,621,624,627,629,630,631,632,633,634,635,637,638,641,645,647,651
]

export async function initGlobals(maxPathLenParm) {
    maxPathLen = maxPathLenParm;

    signer = await getWalletFromMnemonic({mnemonic, token: "OSMO"});
    senderAddr = (await signer.getAccounts())[0].address;

    stargateClient = await getSigningOsmosisClient({rpcEndpoint: rpcEndPoint, signer});

    api = new OsmosisApiClient({url: lcdEndPoint[0]});
    client = await osmosis.ClientFactory.createLCDClient({ restEndpoint: lcdEndPoint[0] });
}

let i = 0
export async function changeClient() {
    i = (i+1)%lcdEndPoint.length;
    client = await osmosis.ClientFactory.createLCDClient({ restEndpoint: lcdEndPoint[i] });
}

export function getDecimals(tokenDenom) {
    for (const tokenKey in tokenInfos.assets) {
        if(tokenInfos.assets[tokenKey].base) {
            return tokenInfos.assets[tokenKey].denom_units[1].exponent;
        }
    }

    return 6;
}

const tokenInfos = {
    "chain_id": "osmosis-1",
    "assets": [
        {
            "description": "The native token of Osmosis",
            "denom_units": [
                {
                    "denom": "uosmo",
                    "exponent": 0,
                    "aliases": []
                },
                {
                    "denom": "osmo",
                    "exponent": 6,
                    "aliases": []
                }
            ],
            "base": "uosmo",
            "name": "Osmosis",
            "display": "osmo",
            "symbol": "OSMO",
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg"
            },
            "coingecko_id": "osmosis"
        },
        {
            "denom_units": [
                {
                    "denom": "uion",
                    "exponent": 0
                },
                {
                    "denom": "ion",
                    "exponent": 6
                }
            ],
            "base": "uion",
            "name": "Ion",
            "display": "ion",
            "symbol": "ION",
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ion.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ion.svg"
            },
            "coingecko_id": "ion"
        },
        {
            "description": "The native staking and governance token of the Cosmos Hub.",
            "denom_units": [
                {
                    "denom": "ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2",
                    "exponent": 0,
                    "aliases": ["uatom"]
                },
                {
                    "denom": "atom",
                    "exponent": 6
                }
            ],
            "base": "ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2",
            "name": "Cosmos",
            "display": "atom",
            "symbol": "ATOM",
            "ibc": {
                "source_channel": "channel-141",
                "dst_channel": "channel-0",
                "source_denom": "uatom"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.svg"
            },
            "coingecko_id": "cosmos"
        },
        {
            "description": "Akash Token (AKT) is the Akash Network's native utility token, used as the primary means to govern, secure the blockchain, incentivize participants, and provide a default mechanism to store and exchange value.",
            "denom_units": [
                {
                    "denom": "ibc/1480B8FD20AD5FCAE81EA87584D269547DD4D436843C1D20F15E00EB64743EF4",
                    "exponent": 0,
                    "aliases": ["uakt"]
                },
                {
                    "denom": "akt",
                    "exponent": 6
                }
            ],
            "base": "ibc/1480B8FD20AD5FCAE81EA87584D269547DD4D436843C1D20F15E00EB64743EF4",
            "name": "Akash Network",
            "display": "akt",
            "symbol": "AKT",
            "ibc": {
                "source_channel": "channel-9",
                "dst_channel": "channel-1",
                "source_denom": "uakt"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/akash/images/akt.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/akash/images/akt.svg"
            },
            "coingecko_id": "akash-network"
        },
        {
            "description": "The XPRT token is primarily a governance token for the Persistence chain.",
            "denom_units": [
                {
                    "denom": "ibc/A0CC0CF735BFB30E730C70019D4218A1244FF383503FF7579C9201AB93CA9293",
                    "exponent": 0,
                    "aliases": ["uxprt"]
                },
                {
                    "denom": "xprt",
                    "exponent": 6
                }
            ],
            "base": "ibc/A0CC0CF735BFB30E730C70019D4218A1244FF383503FF7579C9201AB93CA9293",
            "name": "Persistence",
            "display": "xprt",
            "symbol": "XPRT",
            "ibc": {
                "source_channel": "channel-6",
                "dst_channel": "channel-4",
                "source_denom": "uxprt"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/persistence/images/xprt.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/persistence/images/xprt.svg"
            },
            "coingecko_id": "persistence"
        },
        {
            "description": "The PSTAKE token is primarily a governance token for the Liquid Staking Protocol.",
            "denom_units": [
                {
                    "denom": "ibc/8061A06D3BD4D52C4A28FFECF7150D370393AF0BA661C3776C54FF32836C3961",
                    "exponent": 0
                },
                {
                    "denom": "pstake",
                    "exponent": 18
                }
            ],
            "base": "ibc/8061A06D3BD4D52C4A28FFECF7150D370393AF0BA661C3776C54FF32836C3961",
            "name": "PSTAKE",
            "display": "pstake",
            "symbol": "PSTAKE",
            "ibc": {
                "source_channel": "channel-6",
                "dst_channel": "channel-4",
                "source_denom": "ibc/A6E3AF63B3C906416A9AF7A556C59EA4BD50E617EFFE6299B99700CCB780E444"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/persistence/images/pstake.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/persistence/images/pstake.svg"
            },
            "coingecko_id": "pstake-finance"
        },
        {
            "description": "The IRIS token is the native governance token for the IrisNet chain.",
            "denom_units": [
                {
                    "denom": "ibc/7C4D60AA95E5A7558B0A364860979CA34B7FF8AAF255B87AF9E879374470CEC0",
                    "exponent": 0,
                    "aliases": ["uiris"]
                },
                {
                    "denom": "iris",
                    "exponent": 6
                }
            ],
            "base": "ibc/7C4D60AA95E5A7558B0A364860979CA34B7FF8AAF255B87AF9E879374470CEC0",
            "name": "IRISnet",
            "display": "iris",
            "symbol": "IRIS",
            "ibc": {
                "source_channel": "channel-3",
                "dst_channel": "channel-6",
                "source_denom": "uiris"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/irisnet/images/iris.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/irisnet/images/iris.svg"
            },
            "coingecko_id": "iris-network"
        },
        {
            "description": "DVPN is the native token of the Sentinel Hub.",
            "denom_units": [
                {
                    "denom": "ibc/9712DBB13B9631EDFA9BF61B55F1B2D290B2ADB67E3A4EB3A875F3B6081B3B84",
                    "exponent": 0,
                    "aliases": ["udvpn"]
                },
                {
                    "denom": "dvpn",
                    "exponent": 6
                }
            ],
            "base": "ibc/9712DBB13B9631EDFA9BF61B55F1B2D290B2ADB67E3A4EB3A875F3B6081B3B84",
            "name": "Sentinel",
            "display": "dvpn",
            "symbol": "DVPN",
            "ibc": {
                "source_channel": "channel-0",
                "dst_channel": "channel-2",
                "source_denom": "udvpn"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/sentinel/images/dvpn.png"
            },
            "coingecko_id": "sentinel"
        },
        {
            "description": "CRO coin is the token for the Crypto.com platform.",
            "denom_units": [
                {
                    "denom": "ibc/E6931F78057F7CC5DA0FD6CEF82FF39373A6E0452BF1FD76910B93292CF356C1",
                    "exponent": 0,
                    "aliases": ["basecro"]
                },
                {
                    "denom": "cro",
                    "exponent": 8
                }
            ],
            "base": "ibc/E6931F78057F7CC5DA0FD6CEF82FF39373A6E0452BF1FD76910B93292CF356C1",
            "name": "Cronos",
            "display": "cro",
            "symbol": "CRO",
            "ibc": {
                "source_channel": "channel-10",
                "dst_channel": "channel-5",
                "source_denom": "basecro"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/cryptoorgchain/images/cro.png"
            },
            "coingecko_id": "crypto-com-chain"
        },
        {
            "description": "REGEN coin is the token for the Regen Network Platform",
            "denom_units": [
                {
                    "denom": "ibc/1DCC8A6CB5689018431323953344A9F6CC4D0BFB261E88C9F7777372C10CD076",
                    "exponent": 0,
                    "aliases": ["uregen"]
                },
                {
                    "denom": "regen",
                    "exponent": 6
                }
            ],
            "base": "ibc/1DCC8A6CB5689018431323953344A9F6CC4D0BFB261E88C9F7777372C10CD076",
            "name": "Regen Network",
            "display": "regen",
            "symbol": "REGEN",
            "ibc": {
                "source_channel": "channel-1",
                "dst_channel": "channel-8",
                "source_denom": "uregen"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/regen/images/regen.png"
            },
            "coingecko_id": "regen"
        },
        {
            "description": "IOV coin is the token for the Starname (IOV) Asset Name Service",
            "denom_units": [
                {
                    "denom": "ibc/52B1AA623B34EB78FD767CEA69E8D7FA6C9CFE1FBF49C5406268FD325E2CC2AC",
                    "exponent": 0,
                    "aliases": ["uiov"]
                },
                {
                    "denom": "iov",
                    "exponent": 6
                }
            ],
            "base": "ibc/52B1AA623B34EB78FD767CEA69E8D7FA6C9CFE1FBF49C5406268FD325E2CC2AC",
            "name": "Starname",
            "display": "iov",
            "symbol": "IOV",
            "ibc": {
                "source_channel": "channel-2",
                "dst_channel": "channel-15",
                "source_denom": "uiov"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/starname/images/iov.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/starname/images/iov.svg"
            },
            "coingecko_id": "starname"
        },
        {
            "description": "TICK coin is the token for the Microtick Price Discovery & Oracle App",
            "denom_units": [
                {
                    "denom": "ibc/655BCEF3CDEBE32863FF281DBBE3B06160339E9897DC9C9C9821932A5F8BA6F8",
                    "exponent": 0,
                    "aliases": ["utick"]
                },
                {
                    "denom": "tick",
                    "exponent": 6
                }
            ],
            "base": "ibc/655BCEF3CDEBE32863FF281DBBE3B06160339E9897DC9C9C9821932A5F8BA6F8",
            "display": "tick",
            "name": "Microtick",
            "symbol": "TICK",
            "ibc": {
                "source_channel": "channel-16",
                "dst_channel": "channel-39",
                "source_denom": "utick"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/microtick/images/tick.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/microtick/images/tick.svg"
            },
            "coingecko_id": "microtick"
        },
        {
            "description": "e-Money NGM staking token. In addition to earning staking rewards the token is bought back and burned based on e-Money stablecoin inflation.",
            "denom_units": [
                {
                    "denom": "ibc/1DC495FCEFDA068A3820F903EDBD78B942FBD204D7E93D3BA2B432E9669D1A59",
                    "exponent": 0,
                    "aliases": ["ungm"]
                },
                {
                    "denom": "ngm",
                    "exponent": 6
                }
            ],
            "base": "ibc/1DC495FCEFDA068A3820F903EDBD78B942FBD204D7E93D3BA2B432E9669D1A59",
            "name": "e-Money",
            "display": "ngm",
            "symbol": "NGM",
            "ibc": {
                "source_channel": "channel-0",
                "dst_channel": "channel-37",
                "source_denom": "ungm"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/emoney/images/ngm.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/emoney/images/ngm.svg"
            },
            "coingecko_id": "e-money"
        },
        {
            "description": "e-Money EUR stablecoin. Audited and backed by fiat EUR deposits and government bonds.",
            "denom_units": [
                {
                    "denom": "ibc/5973C068568365FFF40DEDCF1A1CB7582B6116B731CD31A12231AE25E20B871F",
                    "exponent": 0
                },
                {
                    "denom": "eeur",
                    "exponent": 6
                }
            ],
            "base": "ibc/5973C068568365FFF40DEDCF1A1CB7582B6116B731CD31A12231AE25E20B871F",
            "name": "e-Money EUR",
            "display": "eeur",
            "symbol": "EEUR",
            "ibc": {
                "source_channel": "channel-0",
                "dst_channel": "channel-37",
                "source_denom": "eeur"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/emoney/images/eeur.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/emoney/images/eeur.svg"
            },
            "coingecko_id": "e-money-eur"
        },
        {
            "description": "The BCNA coin is the transactional token within the BitCanna network, serving the legal cannabis industry through its payment network, supply chain and trust network.",
            "denom_units": [
                {
                    "denom": "ibc/D805F1DA50D31B96E4282C1D4181EDDFB1A44A598BFF5666F4B43E4B8BEA95A5",
                    "exponent": 0,
                    "aliases": ["ubcna"]
                },
                {
                    "denom": "bcna",
                    "exponent": 6
                }
            ],
            "base": "ibc/D805F1DA50D31B96E4282C1D4181EDDFB1A44A598BFF5666F4B43E4B8BEA95A5",
            "display": "bcna",
            "name": "BitCanna",
            "symbol": "BCNA",
            "ibc": {
                "source_channel": "channel-1",
                "dst_channel": "channel-51",
                "source_denom": "ubcna"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/bitcanna/images/bcna.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/bitcanna/images/bcna.svg"
            },
            "coingecko_id": "bitcanna"
        },
        {
            "description": "The native token of JUNO Chain",
            "denom_units": [
                {
                    "denom": "ibc/46B44899322F3CD854D2D46DEEF881958467CDD4B3B10086DA49296BBED94BED",
                    "exponent": 0,
                    "aliases": ["ujuno"]
                },
                {
                    "denom": "juno",
                    "exponent": 6
                }
            ],
            "base": "ibc/46B44899322F3CD854D2D46DEEF881958467CDD4B3B10086DA49296BBED94BED",
            "name": "Juno",
            "display": "juno",
            "symbol": "JUNO",
            "ibc": {
                "source_channel": "channel-0",
                "dst_channel": "channel-42",
                "source_denom": "ujuno"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/juno.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/juno.svg"
            },
            "coingecko_id": "juno-network"
        },
        {
            "description": "The native token of IXO Chain",
            "denom_units": [
                {
                    "denom": "ibc/F3FF7A84A73B62921538642F9797C423D2B4C4ACB3C7FCFFCE7F12AA69909C4B",
                    "exponent": 0,
                    "aliases": ["uixo"]
                },
                {
                    "denom": "ixo",
                    "exponent": 6
                }
            ],
            "base": "ibc/F3FF7A84A73B62921538642F9797C423D2B4C4ACB3C7FCFFCE7F12AA69909C4B",
            "name": "IXO",
            "display": "ixo",
            "symbol": "IXO",
            "ibc": {
                "source_channel": "channel-4",
                "dst_channel": "channel-38",
                "source_denom": "uixo"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/impacthub/images/ixo.png"
            },
            "coingecko_id": "ixo"
        },
        {
            "description": "LIKE is the native staking and governance token of LikeCoin chain, a Decentralized Publishing Infrastructure to empower content ownership, authenticity, and provenance.",
            "denom_units": [
                {
                    "denom": "ibc/9989AD6CCA39D1131523DB0617B50F6442081162294B4795E26746292467B525",
                    "exponent": 0,
                    "aliases": ["nanolike"]
                },
                {
                    "denom": "like",
                    "exponent": 9
                }
            ],
            "base": "ibc/9989AD6CCA39D1131523DB0617B50F6442081162294B4795E26746292467B525",
            "name": "LikeCoin",
            "display": "like",
            "symbol": "LIKE",
            "ibc": {
                "source_channel": "channel-3",
                "dst_channel": "channel-53",
                "source_denom": "nanolike"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/likecoin/images/like.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/likecoin/images/like.svg"
            },
            "coingecko_id": "likecoin"
        },
        {
            "description": "The native staking token of Terra Classic.",
            "denom_units": [
                {
                    "denom": "ibc/0EF15DF2F02480ADE0BB6E85D9EBB5DAEA2836D3860E9F97F9AADE4F57A31AA0",
                    "exponent": 0,
                    "aliases": ["ulunc"]
                },
                {
                    "denom": "lunc",
                    "exponent": 6
                }
            ],
            "base": "ibc/0EF15DF2F02480ADE0BB6E85D9EBB5DAEA2836D3860E9F97F9AADE4F57A31AA0",
            "name": "Luna Classic",
            "display": "lunc",
            "symbol": "LUNC",
            "ibc": {
                "source_channel": "channel-1",
                "dst_channel": "channel-72",
                "source_denom": "uluna"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/terra/images/luna.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/terra/images/luna.svg"
            },
            "coingecko_id": "terra-luna"
        },
        {
            "description": "The USD stablecoin of Terra Classic.",
            "denom_units": [
                {
                    "denom": "ibc/BE1BB42D4BE3C30D50B68D7C41DB4DFCE9678E8EF8C539F6E6A9345048894FCC",
                    "exponent": 0,
                    "aliases": ["uust"]
                },
                {
                    "denom": "ust",
                    "exponent": 6,
                    "aliases": ["ustc"]
                }
            ],
            "base": "ibc/BE1BB42D4BE3C30D50B68D7C41DB4DFCE9678E8EF8C539F6E6A9345048894FCC",
            "name": "TerraClassicUSD",
            "display": "ust",
            "symbol": "USTC",
            "ibc": {
                "source_channel": "channel-1",
                "dst_channel": "channel-72",
                "source_denom": "uust"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/terra/images/ust.png"
            },
            "coingecko_id": "terrausd"
        },
        {
            "description": "The KRW stablecoin of Terra Classic.",
            "denom_units": [
                {
                    "denom": "ibc/204A582244FC241613DBB50B04D1D454116C58C4AF7866C186AA0D6EEAD42780",
                    "exponent": 0,
                    "aliases": ["ukrw"]
                },
                {
                    "denom": "krt",
                    "exponent": 6,
                    "aliases": ["krtc"]
                }
            ],
            "base": "ibc/204A582244FC241613DBB50B04D1D454116C58C4AF7866C186AA0D6EEAD42780",
            "name": "TerraClassicKRW",
            "display": "krt",
            "symbol": "KRTC",
            "ibc": {
                "source_channel": "channel-1",
                "dst_channel": "channel-72",
                "source_denom": "ukrw"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/terra/images/krt.png"
            },
            "coingecko_id": "terra-krw"
        },
        {
            "description": "The native staking token of Terra 2.0",
            "denom_units": [
                {
                    "denom": "ibc/785AFEC6B3741100D15E7AF01374E3C4C36F24888E96479B1C33F5C71F364EF9",
                    "exponent": 0,
                    "aliases": ["uluna"]
                },
                {
                    "denom": "luna",
                    "exponent": 6
                }
            ],
            "base": "ibc/785AFEC6B3741100D15E7AF01374E3C4C36F24888E96479B1C33F5C71F364EF9",
            "name": "Luna",
            "display": "luna",
            "symbol": "LUNA",
            "ibc": {
                "source_channel": "channel-1",
                "dst_channel": "channel-251",
                "source_denom": "uluna"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/terra2/images/luna.png"
            },
            "coingecko_id": "terra-luna-2"
        },
        {
            "description": "BitSong Native Token",
            "denom_units": [
                {
                    "denom": "ibc/4E5444C35610CC76FC94E7F7886B93121175C28262DDFDDE6F84E82BF2425452",
                    "exponent": 0,
                    "aliases": ["ubtsg"]
                },
                {
                    "denom": "btsg",
                    "exponent": 6
                }
            ],
            "base": "ibc/4E5444C35610CC76FC94E7F7886B93121175C28262DDFDDE6F84E82BF2425452",
            "name": "BitSong",
            "display": "btsg",
            "symbol": "BTSG",
            "ibc": {
                "source_channel": "channel-0",
                "dst_channel": "channel-73",
                "source_denom": "ubtsg"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/bitsong/images/btsg.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/bitsong/images/btsg.svg"
            },
            "coingecko_id": "bitsong"
        },
        {
            "description": "The native token of Ki Chain",
            "denom_units": [
                {
                    "denom": "ibc/B547DC9B897E7C3AA5B824696110B8E3D2C31E3ED3F02FF363DCBAD82457E07E",
                    "exponent": 0,
                    "aliases": ["uxki"]
                },
                {
                    "denom": "xki",
                    "exponent": 6
                }
            ],
            "base": "ibc/B547DC9B897E7C3AA5B824696110B8E3D2C31E3ED3F02FF363DCBAD82457E07E",
            "name": "Ki",
            "display": "xki",
            "symbol": "XKI",
            "ibc": {
                "source_channel": "channel-0",
                "dst_channel": "channel-77",
                "source_denom": "uxki"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/kichain/images/xki.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/kichain/images/xki.svg"
            },
            "coingecko_id": "ki"
        },
        {
            "description": "The native token of Secret Network",
            "denom_units": [
                {
                    "denom": "ibc/0954E1C28EB7AF5B72D24F3BC2B47BBB2FDF91BDDFD57B74B99E133AED40972A",
                    "exponent": 0,
                    "aliases": ["uscrt"]
                },
                {
                    "denom": "scrt",
                    "exponent": 6
                }
            ],
            "base": "ibc/0954E1C28EB7AF5B72D24F3BC2B47BBB2FDF91BDDFD57B74B99E133AED40972A",
            "name": "Secret Network",
            "display": "scrt",
            "symbol": "SCRT",
            "ibc": {
                "source_channel": "channel-1",
                "dst_channel": "channel-88",
                "source_denom": "uscrt"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/secretnetwork/images/scrt.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/secretnetwork/images/scrt.svg"
            },
            "coingecko_id": "secret"
        },
        {
            "description": "Panacea is a public blockchain launched by MediBloc, which is the key infrastructure for reinventing the patient-centered healthcare data ecosystem",
            "denom_units": [
                {
                    "denom": "ibc/3BCCC93AD5DF58D11A6F8A05FA8BC801CBA0BA61A981F57E91B8B598BF8061CB",
                    "exponent": 0,
                    "aliases": ["umed"]
                },
                {
                    "denom": "med",
                    "exponent": 6
                }
            ],
            "base": "ibc/3BCCC93AD5DF58D11A6F8A05FA8BC801CBA0BA61A981F57E91B8B598BF8061CB",
            "name": "MediBloc",
            "display": "med",
            "symbol": "MED",
            "ibc": {
                "source_channel": "channel-1",
                "dst_channel": "channel-82",
                "source_denom": "umed"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/panacea/images/med.png"
            },
            "coingecko_id": "medibloc"
        },
        {
            "description": "The staking token of Bostrom",
            "denom_units": [
                {
                    "denom": "ibc/FE2CD1E6828EC0FAB8AF39BAC45BC25B965BA67CCBC50C13A14BD610B0D1E2C4",
                    "exponent": 0,
                    "aliases": ["boot"]
                }
            ],
            "base": "ibc/FE2CD1E6828EC0FAB8AF39BAC45BC25B965BA67CCBC50C13A14BD610B0D1E2C4",
            "name": "Bostrom",
            "display": "ibc/FE2CD1E6828EC0FAB8AF39BAC45BC25B965BA67CCBC50C13A14BD610B0D1E2C4",
            "symbol": "BOOT",
            "ibc": {
                "source_channel": "channel-2",
                "dst_channel": "channel-95",
                "source_denom": "boot"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/bostrom/images/boot.png"
            },
            "coingecko_id": "bostrom"
        },
        {
            "description": "Native Token of Comdex Protocol",
            "denom_units": [
                {
                    "denom": "ibc/EA3E1640F9B1532AB129A571203A0B9F789A7F14BB66E350DCBFA18E1A1931F0",
                    "exponent": 0,
                    "aliases": ["ucmdx"]
                },
                {
                    "denom": "cmdx",
                    "exponent": 6
                }
            ],
            "base": "ibc/EA3E1640F9B1532AB129A571203A0B9F789A7F14BB66E350DCBFA18E1A1931F0",
            "name": "Comdex",
            "display": "cmdx",
            "symbol": "CMDX",
            "ibc": {
                "source_channel": "channel-1",
                "dst_channel": "channel-87",
                "source_denom": "ucmdx"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/comdex/images/cmdx.png"
            },
            "coingecko_id": "comdex"
        },
        {
            "description": "Native token for the cheqd network",
            "denom_units": [
                {
                    "denom": "ibc/7A08C6F11EF0F59EB841B9F788A87EC9F2361C7D9703157EC13D940DC53031FA",
                    "exponent": 0,
                    "aliases": ["ncheq"]
                },
                {
                    "denom": "cheq",
                    "exponent": 9
                }
            ],
            "base": "ibc/7A08C6F11EF0F59EB841B9F788A87EC9F2361C7D9703157EC13D940DC53031FA",
            "display": "cheq",
            "name": "Cheqd",
            "symbol": "CHEQ",
            "ibc": {
                "source_channel": "channel-0",
                "dst_channel": "channel-108",
                "source_denom": "ncheq"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/cheqd/images/cheq.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/cheqd/images/cheq.svg"
            },
            "coingecko_id": "cheqd-network"
        },
        {
            "description": "The native token of Stargaze",
            "denom_units": [
                {
                    "denom": "ibc/987C17B11ABC2B20019178ACE62929FE9840202CE79498E29FE8E5CB02B7C0A4",
                    "exponent": 0,
                    "aliases": ["ustars"]
                },
                {
                    "denom": "stars",
                    "exponent": 6
                }
            ],
            "base": "ibc/987C17B11ABC2B20019178ACE62929FE9840202CE79498E29FE8E5CB02B7C0A4",
            "name": "Stargaze",
            "display": "stars",
            "symbol": "STARS",
            "ibc": {
                "source_channel": "channel-0",
                "dst_channel": "channel-75",
                "source_denom": "ustars"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/stargaze/images/stars.png"
            },
            "coingecko_id": "stargaze"
        },
        {
            "description": "Native token of the Lum Network",
            "denom_units": [
                {
                    "denom": "ibc/8A34AF0C1943FD0DFCDE9ADBF0B2C9959C45E87E6088EA2FC6ADACD59261B8A2",
                    "exponent": 0,
                    "aliases": ["ulum"]
                },
                {
                    "denom": "lum",
                    "exponent": 6
                }
            ],
            "base": "ibc/8A34AF0C1943FD0DFCDE9ADBF0B2C9959C45E87E6088EA2FC6ADACD59261B8A2",
            "name": "Lum",
            "display": "lum",
            "symbol": "LUM",
            "ibc": {
                "source_channel": "channel-3",
                "dst_channel": "channel-115",
                "source_denom": "ulum"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/lumnetwork/images/lum.png"
            },
            "coingecko_id": "lum-network"
        },
        {
            "description": "The native token of Chihuahua Chain",
            "denom_units": [
                {
                    "denom": "ibc/B9E0A1A524E98BB407D3CED8720EFEFD186002F90C1B1B7964811DD0CCC12228",
                    "exponent": 0,
                    "aliases": ["uhuahua"]
                },
                {
                    "denom": "huahua",
                    "exponent": 6
                }
            ],
            "base": "ibc/B9E0A1A524E98BB407D3CED8720EFEFD186002F90C1B1B7964811DD0CCC12228",
            "name": "Chihuahua",
            "display": "huahua",
            "symbol": "HUAHUA",
            "ibc": {
                "source_channel": "channel-7",
                "dst_channel": "channel-113",
                "source_denom": "uhuahua"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/chihuahua/images/huahua.png"
            },
            "coingecko_id": "chihuahua-token"
        },
        {
            "description": "The native token of Vidulum",
            "denom_units": [
                {
                    "denom": "ibc/E7B35499CFBEB0FF5778127ABA4FB2C4B79A6B8D3D831D4379C4048C238796BD",
                    "exponent": 0,
                    "aliases": ["uvdl"]
                },
                {
                    "denom": "vdl",
                    "exponent": 6
                }
            ],
            "base": "ibc/E7B35499CFBEB0FF5778127ABA4FB2C4B79A6B8D3D831D4379C4048C238796BD",
            "name": "Vidulum",
            "display": "vdl",
            "symbol": "VDL",
            "ibc": {
                "source_channel": "channel-0",
                "dst_channel": "channel-124",
                "source_denom": "uvdl"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/vidulum/images/vdl.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/vidulum/images/vdl.svg"
            },
            "coingecko_id": "vidulum"
        },
        {
            "description": "The native token of Desmos",
            "denom_units": [
                {
                    "denom": "ibc/EA4C0A9F72E2CEDF10D0E7A9A6A22954DB3444910DB5BE980DF59B05A46DAD1C",
                    "exponent": 0,
                    "aliases": ["udsm"]
                },
                {
                    "denom": "dsm",
                    "exponent": 6
                }
            ],
            "base": "ibc/EA4C0A9F72E2CEDF10D0E7A9A6A22954DB3444910DB5BE980DF59B05A46DAD1C",
            "name": "Desmos",
            "display": "dsm",
            "symbol": "DSM",
            "ibc": {
                "source_channel": "channel-2",
                "dst_channel": "channel-135",
                "source_denom": "udsm"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/desmos/images/dsm.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/desmos/images/dsm.svg"
            },
            "coingecko_id": "desmos"
        },
        {
            "description": "The native token of Dig Chain.",
            "denom_units": [
                {
                    "denom": "ibc/307E5C96C8F60D1CBEE269A9A86C0834E1DB06F2B3788AE4F716EDB97A48B97D",
                    "exponent": 0,
                    "aliases": ["udig"]
                },
                {
                    "denom": "dig",
                    "exponent": 6
                }
            ],
            "base": "ibc/307E5C96C8F60D1CBEE269A9A86C0834E1DB06F2B3788AE4F716EDB97A48B97D",
            "name": "Dig Chain",
            "display": "dig",
            "symbol": "DIG",
            "ibc": {
                "source_channel": "channel-1",
                "dst_channel": "channel-128",
                "source_denom": "udig"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/dig/images/dig.png"
            },
            "coingecko_id": "dig-chain"
        },
        {
            "description": "Rowan Token (ROWAN) is the Sifchain Network's native utility token, used as the primary means to govern, provide liquidity, secure the blockchain, incentivize participants, and provide a default mechanism to store and exchange value.",
            "denom_units": [
                {
                    "denom": "ibc/8318FD63C42203D16DDCAF49FE10E8590669B3219A3E87676AC9DA50722687FB",
                    "exponent": 0
                },
                {
                    "denom": "rowan",
                    "exponent": 18
                }
            ],
            "base": "ibc/8318FD63C42203D16DDCAF49FE10E8590669B3219A3E87676AC9DA50722687FB",
            "name": "Sifchain Rowan",
            "display": "rowan",
            "symbol": "ROWAN",
            "ibc": {
                "source_channel": "channel-17",
                "dst_channel": "channel-47",
                "source_denom": "rowan"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/sifchain/images/rowan.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/sifchain/images/rowan.svg"
            },
            "coingecko_id": "sifchain"
        },
        {
            "description": "The native token of Sommelier Chain.",
            "denom_units": [
                {
                    "denom": "ibc/9BBA9A1C257E971E38C1422780CE6F0B0686F0A3085E2D61118D904BFE0F5F5E",
                    "exponent": 0,
                    "aliases": ["usomm"]
                },
                {
                    "denom": "somm",
                    "exponent": 6
                }
            ],
            "base": "ibc/9BBA9A1C257E971E38C1422780CE6F0B0686F0A3085E2D61118D904BFE0F5F5E",
            "name": "Sommelier",
            "display": "somm",
            "symbol": "SOMM",
            "ibc": {
                "source_channel": "channel-0",
                "dst_channel": "channel-165",
                "source_denom": "usomm"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/sommelier/images/somm.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/sommelier/images/somm.svg"
            },
            "coingecko_id": "sommelier"
        },
        {
            "description": "The native token of BandChain",
            "denom_units": [
                {
                    "denom": "ibc/F867AE2112EFE646EC71A25CD2DFABB8927126AC1E19F1BBF0FF693A4ECA05DE",
                    "exponent": 0,
                    "aliases": ["uband"]
                },
                {
                    "denom": "band",
                    "exponent": 6
                }
            ],
            "base": "ibc/F867AE2112EFE646EC71A25CD2DFABB8927126AC1E19F1BBF0FF693A4ECA05DE",
            "name": "Band Protocol",
            "display": "band",
            "symbol": "BAND",
            "ibc": {
                "source_channel": "channel-83",
                "dst_channel": "channel-148",
                "source_denom": "uband"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/bandchain/images/band.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/bandchain/images/band.svg"
            },
            "coingecko_id": "band-protocol"
        },
        {
            "description": "The native staking and governance token of the Konstellation Network.",
            "denom_units": [
                {
                    "denom": "ibc/346786EA82F41FE55FAD14BF69AD8BA9B36985406E43F3CB23E6C45A285A9593",
                    "exponent": 0,
                    "aliases": ["udarc"]
                },
                {
                    "denom": "darc",
                    "exponent": 6
                }
            ],
            "base": "ibc/346786EA82F41FE55FAD14BF69AD8BA9B36985406E43F3CB23E6C45A285A9593",
            "name": "Konstellation",
            "display": "darc",
            "symbol": "DARC",
            "ibc": {
                "source_channel": "channel-0",
                "dst_channel": "channel-171",
                "source_denom": "udarc"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/konstellation/images/darc.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/konstellation/images/darc.svg"
            },
            "coingecko_id": "darcmatter-coin"
        },
        {
            "description": "The native staking and governance token of the Umee Network.",
            "denom_units": [
                {
                    "denom": "ibc/67795E528DF67C5606FC20F824EA39A6EF55BA133F4DC79C90A8C47A0901E17C",
                    "exponent": 0,
                    "aliases": ["uumee"]
                },
                {
                    "denom": "umee",
                    "exponent": 6
                }
            ],
            "base": "ibc/67795E528DF67C5606FC20F824EA39A6EF55BA133F4DC79C90A8C47A0901E17C",
            "name": "Umee",
            "display": "umee",
            "symbol": "UMEE",
            "ibc": {
                "source_channel": "channel-0",
                "dst_channel": "channel-184",
                "source_denom": "uumee"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/umee/images/umee.png"
            },
            "coingecko_id": "umee"
        },
        {
            "description": "The native token of Gravity Bridge",
            "denom_units": [
                {
                    "denom": "ibc/E97634A40119F1898989C2A23224ED83FDD0A57EA46B3A094E287288D1672B44",
                    "exponent": 0,
                    "aliases": ["ugraviton"]
                },
                {
                    "denom": "graviton",
                    "exponent": 6
                }
            ],
            "base": "ibc/E97634A40119F1898989C2A23224ED83FDD0A57EA46B3A094E287288D1672B44",
            "name": "Graviton",
            "display": "graviton",
            "symbol": "GRAV",
            "ibc": {
                "source_channel": "channel-10",
                "dst_channel": "channel-144",
                "source_denom": "ugraviton"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/gravitybridge/images/grav.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/gravitybridge/images/grav.svg"
            },
            "coingecko_id": "graviton"
        },
        {
            "description": "The native token of Fetch.ai Chain",
            "denom_units": [
                {
                    "denom": "ibc/5D1F516200EE8C6B2354102143B78A2DEDA25EDE771AC0F8DC3C1837C8FD4447",
                    "exponent": 0,
                    "aliases": ["afet"]
                },
                {
                    "denom": "fet",
                    "exponent": 18
                }
            ],
            "base": "ibc/5D1F516200EE8C6B2354102143B78A2DEDA25EDE771AC0F8DC3C1837C8FD4447",
            "name": "Fetch.ai",
            "display": "fet",
            "symbol": "FET",
            "ibc": {
                "source_channel": "channel-10",
                "dst_channel": "channel-229",
                "source_denom": "afet"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/fetchhub/images/fet.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/fetchhub/images/fet.svg"
            },
            "coingecko_id": "fetch-ai"
        },
        {
            "description": "The native token cw20 for Neta on Juno Chain",
            "type_asset": "cw20",
            "address": "juno168ctmpyppk90d34p3jjy658zf5a5l3w8wk35wht6ccqj4mr0yv8s4j5awr",
            "denom_units": [
                {
                    "denom": "ibc/297C64CC42B5A8D8F82FE2EBE208A6FE8F94B86037FA28C4529A23701C228F7A",
                    "exponent": 0,
                    "aliases": [
                        "cw20:juno168ctmpyppk90d34p3jjy658zf5a5l3w8wk35wht6ccqj4mr0yv8s4j5awr",
                        "uneta"
                    ]
                },
                {
                    "denom": "neta",
                    "exponent": 6
                }
            ],
            "base": "ibc/297C64CC42B5A8D8F82FE2EBE208A6FE8F94B86037FA28C4529A23701C228F7A",
            "name": "Neta",
            "display": "neta",
            "symbol": "NETA",
            "ibc": {
                "source_channel": "channel-47",
                "dst_channel": "channel-169",
                "source_denom": "cw20:juno168ctmpyppk90d34p3jjy658zf5a5l3w8wk35wht6ccqj4mr0yv8s4j5awr"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/neta.png"
            },
            "coingecko_id": "neta"
        },
        {
            "description": "The native token cw20 for Marble DAO on Juno Chain",
            "type_asset": "cw20",
            "address": "juno1g2g7ucurum66d42g8k5twk34yegdq8c82858gz0tq2fc75zy7khssgnhjl",
            "denom_units": [
                {
                    "denom": "ibc/F6B691D5F7126579DDC87357B09D653B47FDCE0A3383FF33C8D8B544FE29A8A6",
                    "exponent": 0,
                    "aliases": [
                        "cw20:juno1g2g7ucurum66d42g8k5twk34yegdq8c82858gz0tq2fc75zy7khssgnhjl"
                    ]
                },
                {
                    "denom": "marble",
                    "exponent": 3
                }
            ],
            "base": "ibc/F6B691D5F7126579DDC87357B09D653B47FDCE0A3383FF33C8D8B544FE29A8A6",
            "name": "Marble",
            "display": "marble",
            "symbol": "MARBLE",
            "ibc": {
                "source_channel": "channel-47",
                "dst_channel": "channel-169",
                "source_denom": "cw20:juno1g2g7ucurum66d42g8k5twk34yegdq8c82858gz0tq2fc75zy7khssgnhjl"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/marble.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/marble.svg"
            },
            "coingecko_id": "marble"
        },
        {
            "description": "Hope Galaxy is an NFT collection based on its own native Token $HOPE, a cw20 token on Juno chain.",
            "type_asset": "cw20",
            "address": "juno1re3x67ppxap48ygndmrc7har2cnc7tcxtm9nplcas4v0gc3wnmvs3s807z",
            "denom_units": [
                {
                    "denom": "ibc/C2A2E9CA95DDD4828B75124B5E27B8401C7D8493BC48353D418CBFC04565899B",
                    "exponent": 0,
                    "aliases": [
                        "cw20:juno1re3x67ppxap48ygndmrc7har2cnc7tcxtm9nplcas4v0gc3wnmvs3s807z"
                    ]
                },
                {
                    "denom": "hope",
                    "exponent": 6
                }
            ],
            "base": "ibc/C2A2E9CA95DDD4828B75124B5E27B8401C7D8493BC48353D418CBFC04565899B",
            "name": "Hope Galaxy",
            "display": "hope",
            "symbol": "HOPE",
            "ibc": {
                "source_channel": "channel-47",
                "dst_channel": "channel-169",
                "source_denom": "cw20:juno1re3x67ppxap48ygndmrc7har2cnc7tcxtm9nplcas4v0gc3wnmvs3s807z"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/hope.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/hope.svg"
            },
            "coingecko_id": "hope-galaxy"
        },
        {
            "description": "DEC is the native token of Decentr.",
            "denom_units": [
                {
                    "denom": "ibc/9BCB27203424535B6230D594553F1659C77EC173E36D9CF4759E7186EE747E84",
                    "exponent": 0,
                    "aliases": ["udec"]
                },
                {
                    "denom": "dec",
                    "exponent": 6
                }
            ],
            "base": "ibc/9BCB27203424535B6230D594553F1659C77EC173E36D9CF4759E7186EE747E84",
            "name": "Decentr",
            "display": "dec",
            "symbol": "DEC",
            "ibc": {
                "source_channel": "channel-1",
                "dst_channel": "channel-181",
                "source_denom": "udec"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/decentr/images/dec.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/decentr/images/dec.svg"
            },
            "coingecko_id": "decentr"
        },
        {
            "description": "The native token of Carbon",
            "denom_units": [
                {
                    "denom": "ibc/8FEFAE6AECF6E2A255585617F781F35A8D5709A545A804482A261C0C9548A9D3",
                    "exponent": 0,
                    "aliases": ["swth"]
                },
                {
                    "denom": "dswth",
                    "exponent": 8
                }
            ],
            "base": "ibc/8FEFAE6AECF6E2A255585617F781F35A8D5709A545A804482A261C0C9548A9D3",
            "name": "Carbon",
            "display": "dswth",
            "symbol": "SWTH",
            "ibc": {
                "source_channel": "channel-0",
                "dst_channel": "channel-188",
                "source_denom": "swth"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/carbon/images/swth.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/carbon/images/swth.svg"
            },
            "coingecko_id": "switcheo"
        },
        {
            "description": "The native token of Cerberus",
            "denom_units": [
                {
                    "denom": "ibc/41999DF04D9441DAC0DF5D8291DF4333FBCBA810FFD63FDCE34FDF41EF37B6F7",
                    "exponent": 0,
                    "aliases": ["ucrbrus"]
                },
                {
                    "denom": "crbrus",
                    "exponent": 6
                }
            ],
            "base": "ibc/41999DF04D9441DAC0DF5D8291DF4333FBCBA810FFD63FDCE34FDF41EF37B6F7",
            "name": "Cerberus",
            "display": "crbrus",
            "symbol": "CRBRUS",
            "ibc": {
                "source_channel": "channel-1",
                "dst_channel": "channel-212",
                "source_denom": "ucrbrus"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/cerberus/images/crbrus.png"
            },
            "coingecko_id": "cerberus-2"
        },
        {
            "description": "The INJ token is the native governance token for the Injective chain.",
            "denom_units": [
                {
                    "denom": "ibc/64BA6E31FE887D66C6F8F31C7B1A80C7CA179239677B4088BB55F5EA07DBE273",
                    "exponent": 0,
                    "aliases": ["inj"]
                },
                {
                    "denom": "uinj",
                    "exponent": 12
                },
                {
                    "denom": "INJ",
                    "exponent": 18
                }
            ],
            "base": "ibc/64BA6E31FE887D66C6F8F31C7B1A80C7CA179239677B4088BB55F5EA07DBE273",
            "name": "Injective",
            "display": "INJ",
            "symbol": "INJ",
            "ibc": {
                "source_channel": "channel-8",
                "dst_channel": "channel-122",
                "source_denom": "inj"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/inj.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/injective/images/inj.svg"
            },
            "coingecko_id": "injective-protocol"
        },
        {
            "description": "Racoon aims to simplify accessibility to AI, NFTs and Gambling on the Cosmos Ecosystem",
            "type_asset": "cw20",
            "address": "juno1r4pzw8f9z0sypct5l9j906d47z998ulwvhvqe5xdwgy8wf84583sxwh0pa",
            "denom_units": [
                {
                    "denom": "ibc/6BDB4C8CCD45033F9604E4B93ED395008A753E01EECD6992E7D1EA23D9D3B788",
                    "exponent": 0,
                    "aliases": [
                        "cw20:juno1r4pzw8f9z0sypct5l9j906d47z998ulwvhvqe5xdwgy8wf84583sxwh0pa"
                    ]
                },
                {
                    "denom": "rac",
                    "exponent": 6
                }
            ],
            "base": "ibc/6BDB4C8CCD45033F9604E4B93ED395008A753E01EECD6992E7D1EA23D9D3B788",
            "name": "Racoon",
            "display": "rac",
            "symbol": "RAC",
            "ibc": {
                "source_channel": "channel-47",
                "dst_channel": "channel-169",
                "source_denom": "cw20:juno1r4pzw8f9z0sypct5l9j906d47z998ulwvhvqe5xdwgy8wf84583sxwh0pa"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/rac.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/rac.svg"
            },
            "coingecko_id": "racoon"
        },
        {
            "description": "The DAO token to build consensus among Hong Kong People",
            "type_asset": "cw20",
            "address": "juno1tdjwrqmnztn2j3sj2ln9xnyps5hs48q3ddwjrz7jpv6mskappjys5czd49",
            "denom_units": [
                {
                    "denom": "ibc/52E12CF5CA2BB903D84F5298B4BFD725D66CAB95E09AA4FC75B2904CA5485FEB",
                    "exponent": 0,
                    "aliases": ["dhk"]
                }
            ],
            "base": "ibc/52E12CF5CA2BB903D84F5298B4BFD725D66CAB95E09AA4FC75B2904CA5485FEB",
            "name": "DHK",
            "display": "ibc/52E12CF5CA2BB903D84F5298B4BFD725D66CAB95E09AA4FC75B2904CA5485FEB",
            "symbol": "DHK",
            "ibc": {
                "source_channel": "channel-47",
                "dst_channel": "channel-169",
                "source_denom": "cw20:juno1tdjwrqmnztn2j3sj2ln9xnyps5hs48q3ddwjrz7jpv6mskappjys5czd49"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/dhk.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/dhk.svg"
            }
        },
        {
            "description": "Tether's USD stablecoin on Axelar",
            "type_asset": "erc20",
            "denom_units": [
                {
                    "denom": "ibc/8242AD24008032E457D2E12D46588FD39FB54FB29680C6C7663D296B383C37C4",
                    "exponent": 0,
                    "aliases": ["uusdt"]
                },
                {
                    "denom": "axlusdt",
                    "exponent": 6
                }
            ],
            "base": "ibc/8242AD24008032E457D2E12D46588FD39FB54FB29680C6C7663D296B383C37C4",
            "name": "Tether USD",
            "display": "axlusdt",
            "symbol": "USDT.axl",
            "ibc": {
                "source_channel": "channel-3",
                "dst_channel": "channel-208",
                "source_denom": "uusdt"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/uusdt L@3x.png"
            },
            "coingecko_id": "tether"
        },
        {
            "description": "Circle's stablecoin on Axelar",
            "type_asset": "erc20",
            "denom_units": [
                {
                    "denom": "ibc/D189335C6E4A68B513C10AB227BF1C1D38C746766278BA3EEB4FB14124F1D858",
                    "exponent": 0,
                    "aliases": ["uusdc"]
                },
                {
                    "denom": "axlusdc",
                    "exponent": 6
                }
            ],
            "base": "ibc/D189335C6E4A68B513C10AB227BF1C1D38C746766278BA3EEB4FB14124F1D858",
            "name": "USD Coin",
            "display": "axlusdc",
            "symbol": "USDC.axl",
            "ibc": {
                "source_channel": "channel-3",
                "dst_channel": "channel-208",
                "source_denom": "uusdc"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/uausdc L@3x.png"
            },
            "coingecko_id": "usd-coin"
        },
        {
            "description": "Frax's fractional-algorithmic stablecoin on Axelar",
            "type_asset": "erc20",
            "denom_units": [
                {
                    "denom": "ibc/0E43EDE2E2A3AFA36D0CD38BDDC0B49FECA64FA426A82E102F304E430ECF46EE",
                    "exponent": 0,
                    "aliases": ["frax-wei"]
                },
                {
                    "denom": "axlfrax",
                    "exponent": 18
                }
            ],
            "base": "ibc/0E43EDE2E2A3AFA36D0CD38BDDC0B49FECA64FA426A82E102F304E430ECF46EE",
            "name": "Frax",
            "display": "axlfrax",
            "symbol": "FRAX.axl",
            "ibc": {
                "source_channel": "channel-3",
                "dst_channel": "channel-208",
                "source_denom": "frax-wei"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/frax-wei L@3x.png"
            },
            "coingecko_id": "frax"
        },
        {
            "description": "Dai stablecoin on Axelar",
            "type_asset": "erc20",
            "denom_units": [
                {
                    "denom": "ibc/0CD3A0285E1341859B5E86B6AB7682F023D03E97607CCC1DC95706411D866DF7",
                    "exponent": 0,
                    "aliases": ["dai-wei"]
                },
                {
                    "denom": "axldai",
                    "exponent": 18
                }
            ],
            "base": "ibc/0CD3A0285E1341859B5E86B6AB7682F023D03E97607CCC1DC95706411D866DF7",
            "name": "Dai Stablecoin",
            "display": "axldai",
            "symbol": "DAI.axl",
            "ibc": {
                "source_channel": "channel-3",
                "dst_channel": "channel-208",
                "source_denom": "dai-wei"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/dai-wei L@3x.png"
            },
            "coingecko_id": "dai"
        },
        {
            "description": "Wrapped Ether on Axelar",
            "type_asset": "erc20",
            "denom_units": [
                {
                    "denom": "ibc/EA1D43981D5C9A1C4AAEA9C23BB1D4FA126BA9BC7020A25E0AE4AA841EA25DC5",
                    "exponent": 0,
                    "aliases": ["weth-wei"]
                },
                {
                    "denom": "axlweth",
                    "exponent": 18
                }
            ],
            "base": "ibc/EA1D43981D5C9A1C4AAEA9C23BB1D4FA126BA9BC7020A25E0AE4AA841EA25DC5",
            "name": "Wrapped Ether",
            "display": "axlweth",
            "symbol": "WETH.axl",
            "ibc": {
                "source_channel": "channel-3",
                "dst_channel": "channel-208",
                "source_denom": "weth-wei"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/weth-wei L@3x.png"
            },
            "coingecko_id": "weth"
        },
        {
            "description": "Wrapped Bitcoin on Axelar",
            "type_asset": "erc20",
            "denom_units": [
                {
                    "denom": "ibc/D1542AA8762DB13087D8364F3EA6509FD6F009A34F00426AF9E4F9FA85CBBF1F",
                    "exponent": 0,
                    "aliases": ["wbtc-satoshi"]
                },
                {
                    "denom": "axlwbtc",
                    "exponent": 8
                }
            ],
            "base": "ibc/D1542AA8762DB13087D8364F3EA6509FD6F009A34F00426AF9E4F9FA85CBBF1F",
            "name": "Wrapped Bitcoin",
            "display": "axlwbtc",
            "symbol": "WBTC.axl",
            "ibc": {
                "source_channel": "channel-3",
                "dst_channel": "channel-208",
                "source_denom": "wbtc-satoshi"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/wbtc-satoshi L@3x.png"
            },
            "coingecko_id": "wrapped-bitcoin"
        },
        {
            "description": "Gravity Bridge ETH",
            "type_asset": "erc20",
            "denom_units": [
                {
                    "denom": "ibc/65381C5F3FD21442283D56925E62EA524DED8B6927F0FF94E21E0020954C40B5",
                    "exponent": 0,
                    "aliases": ["gravity0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"]
                },
                {
                    "denom": "gweth",
                    "exponent": 18
                }
            ],
            "base": "ibc/65381C5F3FD21442283D56925E62EA524DED8B6927F0FF94E21E0020954C40B5",
            "name": "Wrapped Ethereum",
            "display": "gweth",
            "symbol": "WETH.grv",
            "ibc": {
                "source_channel": "channel-10",
                "dst_channel": "channel-144",
                "source_denom": "gravity0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/gravitybridge/images/gweth.png"
            },
            "coingecko_id": "weth"
        },
        {
      "description": "LumenX community DAO treasury token",
      "type_asset": "cw20",
      "address": "juno1dpany8c0lj526lsa02sldv7shzvnw5dt5ues72rk35hd69rrydxqeraz8l",
      "denom_units": [
        {
          "denom": "cw20:juno1dpany8c0lj526lsa02sldv7shzvnw5dt5ues72rk35hd69rrydxqeraz8l",
          "exponent": 0
        },
        {
          "denom": "ulight",
          "exponent": 6
        }
      ],
      "base": "cw20:juno1dpany8c0lj526lsa02sldv7shzvnw5dt5ues72rk35hd69rrydxqeraz8l",
      "name": "Light",
      "display": "light",
      "symbol": "LIGHT",
      "logo_URIs": {
        "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/light/images/light.png"
      }
    },
        {
            "description": "Gravity Bridge WBTC",
            "denom_units": [
                {
                    "denom": "ibc/C9B0D48FD2C5B91135F118FF2484551888966590D7BDC20F6A87308DBA670796",
                    "exponent": 0,
                    "aliases": ["satoshi"]
                },
                {
                    "denom": "gwbtc",
                    "exponent": 8
                }
            ],
            "base": "ibc/C9B0D48FD2C5B91135F118FF2484551888966590D7BDC20F6A87308DBA670796",
            "name": "Wrapped Bitcoin",
            "display": "gwbtc",
            "symbol": "WBTC.grv",
            "ibc": {
                "source_channel": "channel-10",
                "dst_channel": "channel-144",
                "source_denom": "gravity0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/gravitybridge/images/gwbtc.png"
            },
            "coingecko_id": "wrapped-bitcoin"
        },
        {
            "description": "Gravity Bridge USDC",
            "type_asset": "erc20",
            "denom_units": [
                {
                    "denom": "ibc/9F9B07EF9AD291167CF5700628145DE1DEB777C2CFC7907553B24446515F6D0E",
                    "exponent": 0,
                    "aliases": ["gravity0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"]
                },
                {
                    "denom": "gusdc",
                    "exponent": 6
                }
            ],
            "base": "ibc/9F9B07EF9AD291167CF5700628145DE1DEB777C2CFC7907553B24446515F6D0E",
            "name": "USD Coin",
            "display": "gusdc",
            "symbol": "USDC.grv",
            "ibc": {
                "source_channel": "channel-10",
                "dst_channel": "channel-144",
                "source_denom": "gravity0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/gravitybridge/images/gusdc.png"
            },
            "coingecko_id": "usd-coin"
        },
        {
            "description": "Gravity Bridge Dai",
            "type_asset": "erc20",
            "denom_units": [
                {
                    "denom": "ibc/F292A17CF920E3462C816CBE6B042E779F676CAB59096904C4C1C966413E3DF5",
                    "exponent": 0,
                    "aliases": ["gravity0x6B175474E89094C44Da98b954EedeAC495271d0F"]
                },
                {
                    "denom": "gdai",
                    "exponent": 18
                }
            ],
            "base": "ibc/F292A17CF920E3462C816CBE6B042E779F676CAB59096904C4C1C966413E3DF5",
            "name": "Dai Stablecoin",
            "display": "gdai",
            "symbol": "DAI.grv",
            "ibc": {
                "source_channel": "channel-10",
                "dst_channel": "channel-144",
                "source_denom": "gravity0x6B175474E89094C44Da98b954EedeAC495271d0F"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/gravitybridge/images/gdai.png"
            },
            "coingecko_id": "dai"
        },
        {
            "description": "The native token of AssetMantle",
            "denom_units": [
                {
                    "denom": "ibc/CBA34207E969623D95D057D9B11B0C8B32B89A71F170577D982FDDE623813FFC",
                    "exponent": 0,
                    "aliases": ["umntl"]
                },
                {
                    "denom": "mntl",
                    "exponent": 6
                }
            ],
            "base": "ibc/CBA34207E969623D95D057D9B11B0C8B32B89A71F170577D982FDDE623813FFC",
            "name": "AssetMantle",
            "display": "mntl",
            "symbol": "MNTL",
            "ibc": {
                "source_channel": "channel-0",
                "dst_channel": "channel-232",
                "source_denom": "umntl"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/assetmantle/images/mntl.png"
            },
            "coingecko_id": "assetmantle"
        },
        {
            "description": "Hash is the staking token of the Provenance Blockchain",
            "denom_units": [
                {
                    "denom": "ibc/CE5BFF1D9BADA03BB5CCA5F56939392A761B53A10FBD03B37506669C3218D3B2",
                    "exponent": 0,
                    "aliases": ["nhash"]
                },
                {
                    "denom": "hash",
                    "exponent": 9
                }
            ],
            "base": "ibc/CE5BFF1D9BADA03BB5CCA5F56939392A761B53A10FBD03B37506669C3218D3B2",
            "name": "Provenance",
            "display": "hash",
            "symbol": "HASH",
            "ibc": {
                "source_channel": "channel-7",
                "dst_channel": "channel-222",
                "source_denom": "nhash"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/provenance/images/hash.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/provenance/images/hash.svg"
            },
            "coingecko_id": "provenance-blockchain"
        },
        {
            "description": "GLX is the staking token of the Galaxy Chain",
            "denom_units": [
                {
                    "denom": "ibc/F49DE040EBA5AB2FAD5F660C2A1DDF98A68470FAE82229818BE775EBF3EE79F2",
                    "exponent": 0,
                    "aliases": ["uglx"]
                },
                {
                    "denom": "glx",
                    "exponent": 6
                }
            ],
            "base": "ibc/F49DE040EBA5AB2FAD5F660C2A1DDF98A68470FAE82229818BE775EBF3EE79F2",
            "name": "Galaxy",
            "display": "glx",
            "symbol": "GLX",
            "ibc": {
                "source_channel": "channel-0",
                "dst_channel": "channel-236",
                "source_denom": "uglx"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/galaxy/images/galaxy.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/galaxy/images/galaxy.svg"
            }
        },
        {
            "description": "The BLOCK token of Marble DEX on Juno Chain",
            "type_asset": "cw20",
            "address": "juno1y9rf7ql6ffwkv02hsgd4yruz23pn4w97p75e2slsnkm0mnamhzysvqnxaq",
            "denom_units": [
                {
                    "denom": "ibc/DB9755CB6FE55192948AE074D18FA815E1429D3D374D5BDA8D89623C6CF235C3",
                    "exponent": 0,
                    "aliases": [
                        "cw20:juno1y9rf7ql6ffwkv02hsgd4yruz23pn4w97p75e2slsnkm0mnamhzysvqnxaq"
                    ]
                },
                {
                    "denom": "block",
                    "exponent": 6
                }
            ],
            "base": "ibc/DB9755CB6FE55192948AE074D18FA815E1429D3D374D5BDA8D89623C6CF235C3",
            "name": "Block",
            "display": "block",
            "symbol": "BLOCK",
            "ibc": {
                "source_channel": "channel-47",
                "dst_channel": "channel-169",
                "source_denom": "cw20:juno1y9rf7ql6ffwkv02hsgd4yruz23pn4w97p75e2slsnkm0mnamhzysvqnxaq"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/block.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/block.svg"
            }
        },
        {
            "description": "Token governance for Junoswap",
            "type_asset": "cw20",
            "address": "juno15u3dt79t6sxxa3x3kpkhzsy56edaa5a66wvt3kxmukqjz2sx0hes5sn38g",
            "denom_units": [
                {
                    "denom": "ibc/00B6E60AD3D65CBEF5579AC8AF609527C0B57535B6E32D96C80A735344FD9DCC",
                    "exponent": 0,
                    "aliases": [
                        "cw20:juno15u3dt79t6sxxa3x3kpkhzsy56edaa5a66wvt3kxmukqjz2sx0hes5sn38g"
                    ]
                },
                {
                    "denom": "raw",
                    "exponent": 6
                }
            ],
            "base": "ibc/00B6E60AD3D65CBEF5579AC8AF609527C0B57535B6E32D96C80A735344FD9DCC",
            "name": "JunoSwap",
            "display": "raw",
            "symbol": "RAW",
            "ibc": {
                "source_channel": "channel-47",
                "dst_channel": "channel-169",
                "source_denom": "cw20:juno15u3dt79t6sxxa3x3kpkhzsy56edaa5a66wvt3kxmukqjz2sx0hes5sn38g"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/raw.png"
            }
        },
        {
            "description": "MEME Token (MEME) is the native staking token of the MEME Chain",
            "denom_units": [
                {
                    "denom": "ibc/67C89B8B0A70C08F093C909A4DD996DD10E0494C87E28FD9A551697BF173D4CA",
                    "exponent": 0,
                    "aliases": ["umeme"]
                },
                {
                    "denom": "meme",
                    "exponent": 6
                }
            ],
            "base": "ibc/67C89B8B0A70C08F093C909A4DD996DD10E0494C87E28FD9A551697BF173D4CA",
            "name": "Meme",
            "display": "meme",
            "symbol": "MEME",
            "ibc": {
                "source_channel": "channel-1",
                "dst_channel": "channel-238",
                "source_denom": "umeme"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/meme/images/meme.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/meme/images/meme.svg"
            }
        },
        {
            "description": "Profit sharing token for Another.Software validator. Hold and receive dividends from Another.Software validator commissions!",
            "type_asset": "cw20",
            "address": "juno17wzaxtfdw5em7lc94yed4ylgjme63eh73lm3lutp2rhcxttyvpwsypjm4w",
            "denom_units": [
                {
                    "denom": "ibc/AA1C80225BCA7B32ED1FC6ABF8B8E899BEB48ECDB4B417FD69873C6D715F97E7",
                    "exponent": 0,
                    "aliases": [
                        "cw20:juno17wzaxtfdw5em7lc94yed4ylgjme63eh73lm3lutp2rhcxttyvpwsypjm4w"
                    ]
                },
                {
                    "denom": "asvt",
                    "exponent": 6
                }
            ],
            "base": "ibc/AA1C80225BCA7B32ED1FC6ABF8B8E899BEB48ECDB4B417FD69873C6D715F97E7",
            "name": "Another.Software Validator Token",
            "display": "asvt",
            "symbol": "ASVT",
            "ibc": {
                "source_channel": "channel-47",
                "dst_channel": "channel-169",
                "source_denom": "cw20:juno17wzaxtfdw5em7lc94yed4ylgjme63eh73lm3lutp2rhcxttyvpwsypjm4w"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/asvt.png"
            }
        },
        {
            "description": "The native EVM, governance and staking token of the Evmos Hub",
            "denom_units": [
                {
                    "denom": "ibc/6AE98883D4D5D5FF9E50D7130F1305DA2FFA0C652D1DD9C123657C6B4EB2DF8A",
                    "exponent": 0,
                    "aliases": ["aevmos"]
                },
                {
                    "denom": "evmos",
                    "exponent": 18
                }
            ],
            "base": "ibc/6AE98883D4D5D5FF9E50D7130F1305DA2FFA0C652D1DD9C123657C6B4EB2DF8A",
            "name": "Evmos",
            "display": "evmos",
            "symbol": "EVMOS",
            "ibc": {
                "source_channel": "channel-0",
                "dst_channel": "channel-204",
                "source_denom": "aevmos"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/evmos/images/evmos.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/evmos/images/evmos.svg"
            },
            "coingecko_id": "evmos"
        },
        {
            "description": "The native EVM, governance, bridge, and staking token of Echelon",
            "denom_units": [
                {
                    "denom": "ibc/49C2B2C444B7C5F0066657A4DBF19D676E0D185FF721CFD3E14FA253BCB9BC04",
                    "exponent": 0,
                    "aliases": ["aechelon"]
                },
                {
                    "denom": "echelon",
                    "exponent": 18
                }
            ],
            "base": "ibc/49C2B2C444B7C5F0066657A4DBF19D676E0D185FF721CFD3E14FA253BCB9BC04",
            "name": "Echelon",
            "display": "echelon",
            "symbol": "ECH",
            "ibc": {
                "source_channel": "channel-8",
                "dst_channel": "channel-262",
                "source_denom": "aechelon"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/echelon/images/logo.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/echelon/images/echelon.svg"
            },
            "coingecko_id": "echelon"
        },
        {
            "description": "DAO dedicated to building tools on the Juno Network",
            "type_asset": "cw20",
            "address": "juno1n7n7d5088qlzlj37e9mgmkhx6dfgtvt02hqxq66lcap4dxnzdhwqfmgng3",
            "denom_units": [
                {
                    "denom": "ibc/0CB9DB3441D0D50F35699DEE22B9C965487E83FB2D9F483D1CC5CA34E856C484",
                    "exponent": 0,
                    "aliases": [
                        "cw20:juno1n7n7d5088qlzlj37e9mgmkhx6dfgtvt02hqxq66lcap4dxnzdhwqfmgng3"
                    ]
                },
                {
                    "denom": "joe",
                    "exponent": 6
                }
            ],
            "base": "ibc/0CB9DB3441D0D50F35699DEE22B9C965487E83FB2D9F483D1CC5CA34E856C484",
            "name": "JoeDAO",
            "display": "joe",
            "symbol": "JOE",
            "ibc": {
                "source_channel": "channel-47",
                "dst_channel": "channel-169",
                "source_denom": "cw20:juno1n7n7d5088qlzlj37e9mgmkhx6dfgtvt02hqxq66lcap4dxnzdhwqfmgng3"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/joe.png"
            }
        },
        {
            "description": "The native staking and governance token of Kava",
            "denom_units": [
                {
                    "denom": "ibc/57AA1A70A4BC9769C525EBF6386F7A21536E04A79D62E1981EFCEF9428EBB205",
                    "exponent": 0,
                    "aliases": ["ukava"]
                },
                {
                    "denom": "kava",
                    "exponent": 6
                }
            ],
            "base": "ibc/57AA1A70A4BC9769C525EBF6386F7A21536E04A79D62E1981EFCEF9428EBB205",
            "name": "Kava",
            "display": "kava",
            "symbol": "KAVA",
            "ibc": {
                "source_channel": "channel-1",
                "dst_channel": "channel-143",
                "source_denom": "ukava"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/kava/images/kava.png"
            },
            "coingecko_id": "kava"
        },
        {
            "description": "L1 coin is the GenesisL1 blockchain utility, governance and EVM token",
            "denom_units": [
                {
                    "denom": "ibc/F16FDC11A7662B86BC0B9CE61871CBACF7C20606F95E86260FD38915184B75B4",
                    "exponent": 0,
                    "aliases": ["el1"]
                },
                {
                    "denom": "l1",
                    "exponent": 18
                }
            ],
            "base": "ibc/F16FDC11A7662B86BC0B9CE61871CBACF7C20606F95E86260FD38915184B75B4",
            "name": "GenesisL1",
            "display": "l1",
            "symbol": "L1",
            "ibc": {
                "source_channel": "channel-1",
                "dst_channel": "channel-253",
                "source_denom": "el1"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/genesisl1/images/l1.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/genesisl1/images/l1.svg"
            }
        },
        {
            "description": "Atolo the native token of Rizon Chain",
            "denom_units": [
                {
                    "denom": "ibc/2716E3F2E146664BEFA9217F1A03BFCEDBCD5178B3C71CACB1A0D7584451D219",
                    "exponent": 0,
                    "aliases": ["uatolo"]
                },
                {
                    "denom": "atolo",
                    "exponent": 6
                }
            ],
            "base": "ibc/2716E3F2E146664BEFA9217F1A03BFCEDBCD5178B3C71CACB1A0D7584451D219",
            "name": "Atolo",
            "display": "atolo",
            "symbol": "ATOLO",
            "ibc": {
                "source_channel": "channel-1",
                "dst_channel": "channel-221",
                "source_denom": "uatolo"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/rizon/images/atolo.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/rizon/images/atolo.svg"
            },
            "coingecko_id": "rizon"
        },
        {
            "description": "The native token of Tgrade",
            "denom_units": [
                {
                    "denom": "ibc/1E09CB0F506ACF12FDE4683FB6B34DA62FB4BE122641E0D93AAF98A87675676C",
                    "exponent": 0,
                    "aliases": ["utgd"]
                },
                {
                    "denom": "tgd",
                    "exponent": 6
                }
            ],
            "base": "ibc/1E09CB0F506ACF12FDE4683FB6B34DA62FB4BE122641E0D93AAF98A87675676C",
            "name": "Tgrade",
            "display": "tgd",
            "symbol": "TGD",
            "ibc": {
                "source_channel": "channel-0",
                "dst_channel": "channel-263",
                "source_denom": "utgd"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/tgrade/images/tgrade-symbol-gradient.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/tgrade/images/tgrade-symbol-gradient.svg"
            }
        },
        {
            "description": "Staking and goverance token for ODIN Protocol",
            "denom_units": [
                {
                    "denom": "ibc/C360EF34A86D334F625E4CBB7DA3223AEA97174B61F35BB3758081A8160F7D9B",
                    "exponent": 0,
                    "aliases": ["loki"]
                },
                {
                    "denom": "odin",
                    "exponent": 6
                }
            ],
            "base": "ibc/C360EF34A86D334F625E4CBB7DA3223AEA97174B61F35BB3758081A8160F7D9B",
            "name": "ODIN",
            "display": "odin",
            "symbol": "ODIN",
            "ibc": {
                "source_channel": "channel-3",
                "dst_channel": "channel-258",
                "source_denom": "loki"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/odin/images/odin.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/odin/images/odin.svg"
            },
            "coingecko_id": "odin-protocol"
        },
        {
            "description": "Geo token for ODIN Protocol",
            "denom_units": [
                {
                    "denom": "ibc/9B6FBABA36BB4A3BF127AE5E96B572A5197FD9F3111D895D8919B07BC290764A",
                    "exponent": 0,
                    "aliases": ["mGeo"]
                },
                {
                    "denom": "geo",
                    "exponent": 6
                }
            ],
            "base": "ibc/9B6FBABA36BB4A3BF127AE5E96B572A5197FD9F3111D895D8919B07BC290764A",
            "name": "GEO",
            "display": "geo",
            "symbol": "GEO",
            "ibc": {
                "source_channel": "channel-3",
                "dst_channel": "channel-258",
                "source_denom": "mGeo"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/odin/images/geo.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/odin/images/geo.svg"
            }
        },
        {
            "description": "O9W token for ODIN Protocol",
            "denom_units": [
                {
                    "denom": "ibc/0CD46223FEABD2AEAAAF1F057D01E63BCA79B7D4BD6B68F1EB973A987344695D",
                    "exponent": 0,
                    "aliases": ["mO9W"]
                },
                {
                    "denom": "O9W",
                    "exponent": 6
                }
            ],
            "base": "ibc/0CD46223FEABD2AEAAAF1F057D01E63BCA79B7D4BD6B68F1EB973A987344695D",
            "name": "O9W",
            "display": "O9W",
            "symbol": "O9W",
            "ibc": {
                "source_channel": "channel-3",
                "dst_channel": "channel-258",
                "source_denom": "mO9W"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/odin/images/o9w.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/odin/images/o9w.svg"
            }
        },
        {
            "description": "The native token of Shentu",
            "denom_units": [
                {
                    "denom": "ibc/7ED954CFFFC06EE8419387F3FC688837FF64EF264DE14219935F724EEEDBF8D3",
                    "exponent": 0,
                    "aliases": ["uctk"]
                },
                {
                    "denom": "ctk",
                    "exponent": 6
                }
            ],
            "base": "ibc/7ED954CFFFC06EE8419387F3FC688837FF64EF264DE14219935F724EEEDBF8D3",
            "name": "Shentu",
            "display": "ctk",
            "symbol": "CTK",
            "ibc": {
                "source_channel": "channel-8",
                "dst_channel": "channel-146",
                "source_denom": "uctk"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/shentu/images/ctk.png"
            },
            "coingecko_id": "certik"
        },
        {
            "description": "The native staking and governance token of the Kujira chain.",
            "denom_units": [
                {
                    "denom": "ibc/BB6BCDB515050BAE97516111873CCD7BCF1FD0CCB723CC12F3C4F704D6C646CE",
                    "exponent": 0,
                    "aliases": ["ukuji"]
                },
                {
                    "denom": "kuji",
                    "exponent": 6
                }
            ],
            "base": "ibc/BB6BCDB515050BAE97516111873CCD7BCF1FD0CCB723CC12F3C4F704D6C646CE",
            "name": "Kuji",
            "display": "kuji",
            "symbol": "KUJI",
            "ibc": {
                "source_channel": "channel-3",
                "dst_channel": "channel-259",
                "source_denom": "ukuji"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/kujira/images/kuji.png"
            },
            "coingecko_id": "kujira"
        },
        {
            "description": "The native over-collateralized stablecoin from the Kujira chain.",
            "denom_units": [
                {
                    "denom": "ibc/44492EAB24B72E3FB59B9FA619A22337FB74F95D8808FE6BC78CC0E6C18DC2EC",
                    "exponent": 0,
                    "aliases": ["uusk"]
                },
                {
                    "denom": "usk",
                    "exponent": 6
                }
            ],
            "base": "ibc/44492EAB24B72E3FB59B9FA619A22337FB74F95D8808FE6BC78CC0E6C18DC2EC",
            "name": "USK",
            "display": "USK",
            "symbol": "USK",
            "ibc": {
                "source_channel": "channel-3",
                "dst_channel": "channel-259",
                "source_denom": "factory:kujira1qk00h5atutpsv900x202pxx42npjr9thg58dnqpa72f2p7m2luase444a7:uusk"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/kujira/images/usk.png"
            },
            "coingecko_id": "usk"
        },
        {
            "description": "Governance token of Kava Lend Protocol",
            "denom_units": [
                {
                    "denom": "ibc/D6C28E07F7343360AC41E15DDD44D79701DDCA2E0C2C41279739C8D4AE5264BC",
                    "exponent": 0,
                    "aliases": ["hard"]
                },
                {
                    "denom": "HARD",
                    "exponent": 6
                }
            ],
            "base": "ibc/D6C28E07F7343360AC41E15DDD44D79701DDCA2E0C2C41279739C8D4AE5264BC",
            "name": "Hard",
            "display": "HARD",
            "symbol": "HARD",
            "ibc": {
                "source_channel": "channel-1",
                "dst_channel": "channel-143",
                "source_denom": "hard"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/kava/images/hard.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/kava/images/hard.svg"
            },
            "coingecko_id": "kava-lend"
        },
        {
            "description": "Governance token of Kava Swap Protocol",
            "denom_units": [
                {
                    "denom": "ibc/70CF1A54E23EA4E480DEDA9E12082D3FD5684C3483CBDCE190C5C807227688C5",
                    "exponent": 0,
                    "aliases": ["swp"]
                },
                {
                    "denom": "SWP",
                    "exponent": 6
                }
            ],
            "base": "ibc/70CF1A54E23EA4E480DEDA9E12082D3FD5684C3483CBDCE190C5C807227688C5",
            "name": "Swap",
            "display": "SWP",
            "symbol": "SWP",
            "ibc": {
                "source_channel": "channel-1",
                "dst_channel": "channel-143",
                "source_denom": "swp"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/kava/images/swp.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/kava/images/swp.svg"
            },
            "coingecko_id": "kava-swap"
        },
        {
            "description": "The native stablecoin of Kava",
            "denom_units": [
                {
                    "denom": "ibc/C78F65E1648A3DFE0BAEB6C4CDA69CC2A75437F1793C0E6386DFDA26393790AE",
                    "exponent": 0,
                    "aliases": ["usdx"]
                },
                {
                    "denom": "USDX",
                    "exponent": 6
                }
            ],
            "base": "ibc/C78F65E1648A3DFE0BAEB6C4CDA69CC2A75437F1793C0E6386DFDA26393790AE",
            "name": "USDX",
            "display": "USDX",
            "symbol": "USDX",
            "ibc": {
                "source_channel": "channel-1",
                "dst_channel": "channel-143",
                "source_denom": "usdx"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/kava/images/usdx.png"
            },
            "coingecko_id": "usdx"
        },
        {
            "description": "Gravity Bridge USDT",
            "type_asset": "erc20",
            "denom_units": [
                {
                    "denom": "ibc/71B441E27F1BBB44DD0891BCD370C2794D404D60A4FFE5AECCD9B1E28BC89805",
                    "exponent": 0,
                    "aliases": ["gravity0xdAC17F958D2ee523a2206206994597C13D831ec7"]
                },
                {
                    "denom": "gusdt",
                    "exponent": 6
                }
            ],
            "base": "ibc/71B441E27F1BBB44DD0891BCD370C2794D404D60A4FFE5AECCD9B1E28BC89805",
            "name": "Tether USD",
            "display": "gusdt",
            "symbol": "USDT.grv",
            "ibc": {
                "source_channel": "channel-10",
                "dst_channel": "channel-144",
                "source_denom": "gravity0xdAC17F958D2ee523a2206206994597C13D831ec7"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/gravitybridge/images/gusdt.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/gravitybridge/images/gusdt.svg"
            },
            "coingecko_id": "usd-coin"
        },
        {
            "description": "Chainlink on Axelar",
            "type_asset": "erc20",
            "denom_units": [
                {
                    "denom": "ibc/D3327A763C23F01EC43D1F0DB3CEFEC390C362569B6FD191F40A5192F8960049",
                    "exponent": 0,
                    "aliases": ["link-wei"]
                },
                {
                    "denom": "axllink",
                    "exponent": 18
                }
            ],
            "base": "ibc/D3327A763C23F01EC43D1F0DB3CEFEC390C362569B6FD191F40A5192F8960049",
            "name": "Chainlink",
            "display": "axllink",
            "symbol": "LINK.axl",
            "ibc": {
                "source_channel": "channel-3",
                "dst_channel": "channel-208",
                "source_denom": "link-wei"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/link-wei L@3x.png"
            },
            "coingecko_id": "chainlink"
        },
        {
            "description": "Aave on Axelar",
            "type_asset": "erc20",
            "denom_units": [
                {
                    "denom": "ibc/384E5DD50BDE042E1AAF51F312B55F08F95BC985C503880189258B4D9374CBBE",
                    "exponent": 0,
                    "aliases": ["aave-wei"]
                },
                {
                    "denom": "axlaave",
                    "exponent": 18
                }
            ],
            "base": "ibc/384E5DD50BDE042E1AAF51F312B55F08F95BC985C503880189258B4D9374CBBE",
            "name": "Aave",
            "display": "axlaave",
            "symbol": "AAVE.axl",
            "ibc": {
                "source_channel": "channel-3",
                "dst_channel": "channel-208",
                "source_denom": "aave-wei"
            },
            "logo_URIs": {
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/aave-wei L@3x.png"
            },
            "coingecko_id": "aave"
        },
        {
            "description": "ApeCoin on Axelar",
            "type_asset": "erc20",
            "denom_units": [
                {
                    "denom": "ibc/F83CC6471DA4D4B508F437244F10B9E4C68975344E551A2DEB6B8617AB08F0D4",
                    "exponent": 0,
                    "aliases": ["ape-wei"]
                },
                {
                    "denom": "axlape",
                    "exponent": 18
                }
            ],
            "base": "ibc/F83CC6471DA4D4B508F437244F10B9E4C68975344E551A2DEB6B8617AB08F0D4",
            "name": "ApeCoin",
            "display": "axlape",
            "symbol": "APE.axl",
            "ibc": {
                "source_channel": "channel-3",
                "dst_channel": "channel-208",
                "source_denom": "ape-wei"
            },
            "logo_URIs": {
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/ape-wei L@3x.png"
            },
            "coingecko_id": "apecoin"
        },
        {
            "description": "Axie Infinity Shard on Axelar",
            "type_asset": "erc20",
            "denom_units": [
                {
                    "denom": "ibc/6C0CB8653012DC2BC1820FD0B6B3AFF8A07D18630BDAEE066FEFB2D92F477C24",
                    "exponent": 0,
                    "aliases": ["axs-wei"]
                },
                {
                    "denom": "axlaxs",
                    "exponent": 18
                }
            ],
            "base": "ibc/6C0CB8653012DC2BC1820FD0B6B3AFF8A07D18630BDAEE066FEFB2D92F477C24",
            "name": "Axie Infinity Shard",
            "display": "axlaxs",
            "symbol": "AXS.axl",
            "ibc": {
                "source_channel": "channel-3",
                "dst_channel": "channel-208",
                "source_denom": "axs-wei"
            },
            "logo_URIs": {
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/axs-wei L@3x.png"
            },
            "coingecko_id": "axie-infinity"
        },
        {
            "description": "Maker on Axelar",
            "type_asset": "erc20",
            "denom_units": [
                {
                    "denom": "ibc/D27DDDF34BB47E5D5A570742CC667DE53277867116CCCA341F27785E899A70F3",
                    "exponent": 0,
                    "aliases": ["mkr-wei"]
                },
                {
                    "denom": "axlmkr",
                    "exponent": 18
                }
            ],
            "base": "ibc/D27DDDF34BB47E5D5A570742CC667DE53277867116CCCA341F27785E899A70F3",
            "name": "Maker",
            "display": "axlmkr",
            "symbol": "MKR.axl",
            "ibc": {
                "source_channel": "channel-3",
                "dst_channel": "channel-208",
                "source_denom": "mkr-wei"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/mkr-wei L@3x.png"
            },
            "coingecko_id": "maker"
        },
        {
            "description": "Rai Reflex Index on Axelar",
            "type_asset": "erc20",
            "denom_units": [
                {
                    "denom": "ibc/BD796662F8825327D41C96355DF62045A5BA225BAE31C0A86289B9D88ED3F44E",
                    "exponent": 0,
                    "aliases": ["rai-wei"]
                },
                {
                    "denom": "axlrai",
                    "exponent": 18
                }
            ],
            "base": "ibc/BD796662F8825327D41C96355DF62045A5BA225BAE31C0A86289B9D88ED3F44E",
            "name": "Rai Reflex Index",
            "display": "axlrai",
            "symbol": "RAI.axl",
            "ibc": {
                "source_channel": "channel-3",
                "dst_channel": "channel-208",
                "source_denom": "rai-wei"
            },
            "logo_URIs": {
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/rai-wei L@3x.png"
            },
            "coingecko_id": "rai"
        },
        {
            "description": "Shiba Inu on Axelar",
            "type_asset": "erc20",
            "denom_units": [
                {
                    "denom": "ibc/19305E20681911F14D1FB275E538CDE524C3BF88CF9AE5D5F78F4D4DA05E85B2",
                    "exponent": 0,
                    "aliases": ["shib-wei"]
                },
                {
                    "denom": "axlshib",
                    "exponent": 18
                }
            ],
            "base": "ibc/19305E20681911F14D1FB275E538CDE524C3BF88CF9AE5D5F78F4D4DA05E85B2",
            "name": "Shiba Inu",
            "display": "axlshib",
            "symbol": "SHIB.axl",
            "ibc": {
                "source_channel": "channel-3",
                "dst_channel": "channel-208",
                "source_denom": "shib-wei"
            },
            "logo_URIs": {
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/shib-wei L@3x.png"
            },
            "coingecko_id": "shiba-inu"
        },
        {
            "description": "Uniswap on Axelar",
            "type_asset": "erc20",
            "denom_units": [
                {
                    "denom": "ibc/AE2719773D6FCDD05AC17B1ED63F672F5F9D84144A61965F348C86C2A83AD161",
                    "exponent": 0,
                    "aliases": ["uni-wei"]
                },
                {
                    "denom": "axluni",
                    "exponent": 18
                }
            ],
            "base": "ibc/AE2719773D6FCDD05AC17B1ED63F672F5F9D84144A61965F348C86C2A83AD161",
            "name": "Uniswap",
            "display": "axluni",
            "symbol": "UNI.axl",
            "ibc": {
                "source_channel": "channel-3",
                "dst_channel": "channel-208",
                "source_denom": "uni-wei"
            },
            "logo_URIs": {
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/uni-wei L@3x.png"
            },
            "coingecko_id": "uniswap"
        },
        {
            "description": "Chain on Axelar",
            "type_asset": "erc20",
            "denom_units": [
                {
                    "denom": "ibc/B901BEC1B71D0573E6EE874FEC39E2DF4C2BDB1DB74CB3DA0A9CACC4A435B0EC",
                    "exponent": 0,
                    "aliases": ["xcn-wei"]
                },
                {
                    "denom": "axlxcn",
                    "exponent": 18
                }
            ],
            "base": "ibc/B901BEC1B71D0573E6EE874FEC39E2DF4C2BDB1DB74CB3DA0A9CACC4A435B0EC",
            "name": "Chain",
            "display": "axlxcn",
            "symbol": "XCN.axl",
            "ibc": {
                "source_channel": "channel-3",
                "dst_channel": "channel-208",
                "source_denom": "xcn-wei"
            },
            "logo_URIs": {
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/xcn-wei L@3x.png"
            },
            "coingecko_id": "chain-2"
        },
        {
            "description": "ELEVENPARIS loyalty token on KiChain",
            "type_asset": "cw20",
            "address": "ki1dt3lk455ed360pna38fkhqn0p8y44qndsr77qu73ghyaz2zv4whq83mwdy",
            "denom_units": [
                {
                    "denom": "ibc/AD185F62399F770CCCE8A36A180A77879FF6C26A0398BD3D2A74E087B0BFA121",
                    "exponent": 0,
                    "aliases": [
                        "cw20:ki1dt3lk455ed360pna38fkhqn0p8y44qndsr77qu73ghyaz2zv4whq83mwdy",
                        "ulvn"
                    ]
                },
                {
                    "denom": "lvn",
                    "exponent": 6
                }
            ],
            "base": "ibc/AD185F62399F770CCCE8A36A180A77879FF6C26A0398BD3D2A74E087B0BFA121",
            "name": "Lvn",
            "display": "lvn",
            "symbol": "LVN",
            "ibc": {
                "source_channel": "channel-18",
                "dst_channel": "channel-261",
                "source_denom": "cw20:ki1dt3lk455ed360pna38fkhqn0p8y44qndsr77qu73ghyaz2zv4whq83mwdy"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/kichain/images/lvn.png"
            },
            "coingecko_id": "lvn"
        },
        {
            "description": "Wrapped GLMR on Axelar",
            "type_asset": "erc20",
            "denom_units": [
                {
                    "denom": "ibc/1E26DB0E5122AED464D98462BD384FCCB595732A66B3970AE6CE0B58BAE0FC49",
                    "exponent": 0,
                    "aliases": ["wglmr-wei", "0xacc15dc74880c9944775448304b263d191c6077f"]
                },
                {
                    "denom": "axlwglmr",
                    "exponent": 18
                }
            ],
            "base": "ibc/1E26DB0E5122AED464D98462BD384FCCB595732A66B3970AE6CE0B58BAE0FC49",
            "name": "Wrapped GLMR",
            "display": "axlwglmr",
            "symbol": "WGLMR.axl",
            "ibc": {
                "source_channel": "channel-3",
                "dst_channel": "channel-208",
                "source_denom": "wglmr-wei"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/wdev-wei.png"
            },
            "coingecko_id": "wrapped-moonbeam"
        },
        {
            "description": "Wrapped Polkadot on Axelar",
            "type_asset": "erc20",
            "denom_units": [
                {
                    "denom": "ibc/3FF92D26B407FD61AE95D975712A7C319CDE28DE4D80BDC9978D935932B991D7",
                    "exponent": 0,
                    "aliases": [
                        "dot-planck",
                        "0xffffffff1fcacbd218edc0eba20fc2308c778080"
                    ]
                },
                {
                    "denom": "axldot",
                    "exponent": 10
                }
            ],
            "base": "ibc/3FF92D26B407FD61AE95D975712A7C319CDE28DE4D80BDC9978D935932B991D7",
            "name": "DOT",
            "display": "axldot",
            "symbol": "DOT.axl",
            "ibc": {
                "source_channel": "channel-3",
                "dst_channel": "channel-208",
                "source_denom": "dot-planck"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/axelar/images/dot-planck L@3x.png"
            },
            "coingecko_id": "polkadot"
        },
        {
            "description": "DeFi gaming platform built on Juno",
            "type_asset": "cw20",
            "address": "juno1j0a9ymgngasfn3l5me8qpd53l5zlm9wurfdk7r65s5mg6tkxal3qpgf5se",
            "denom_units": [
                {
                    "denom": "ibc/52C57FCA7D6854AA178E7A183DDBE4EF322B904B1D719FC485F6FFBC1F72A19E",
                    "exponent": 0,
                    "aliases": [
                        "cw20:juno1j0a9ymgngasfn3l5me8qpd53l5zlm9wurfdk7r65s5mg6tkxal3qpgf5se"
                    ]
                },
                {
                    "denom": "glto",
                    "exponent": 6
                }
            ],
            "base": "ibc/52C57FCA7D6854AA178E7A183DDBE4EF322B904B1D719FC485F6FFBC1F72A19E",
            "name": "Gelotto",
            "display": "glto",
            "symbol": "GLTO",
            "ibc": {
                "source_channel": "channel-47",
                "dst_channel": "channel-169",
                "source_denom": "cw20:juno1j0a9ymgngasfn3l5me8qpd53l5zlm9wurfdk7r65s5mg6tkxal3qpgf5se"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/glto.png"
            }
        },
        {
            "description": "Gelotto Year 1 Grand Prize Token",
            "type_asset": "cw20",
            "address": "juno1gz8cf86zr4vw9cjcyyv432vgdaecvr9n254d3uwwkx9rermekddsxzageh",
            "denom_units": [
                {
                    "denom": "ibc/7C781B4C2082CD62129A972D47486D78EC17155C299270E3C89348EA026BEAF8",
                    "exponent": 0,
                    "aliases": [
                        "cw20:juno1gz8cf86zr4vw9cjcyyv432vgdaecvr9n254d3uwwkx9rermekddsxzageh"
                    ]
                },
                {
                    "denom": "gkey",
                    "exponent": 6
                }
            ],
            "base": "ibc/7C781B4C2082CD62129A972D47486D78EC17155C299270E3C89348EA026BEAF8",
            "name": "GKey",
            "display": "gkey",
            "symbol": "GKEY",
            "ibc": {
                "source_channel": "channel-47",
                "dst_channel": "channel-169",
                "source_denom": "cw20:juno1gz8cf86zr4vw9cjcyyv432vgdaecvr9n254d3uwwkx9rermekddsxzageh"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/gkey.png"
            }
        },
        {
            "description": "CRE is the native token of the Crescent Network.",
            "denom_units": [
                {
                    "denom": "ibc/5A7C219BA5F7582B99629BA3B2A01A61BFDA0F6FD1FE95B5366F7334C4BC0580",
                    "exponent": 0,
                    "aliases": ["ucre"]
                },
                {
                    "denom": "cre",
                    "exponent": 6
                }
            ],
            "base": "ibc/5A7C219BA5F7582B99629BA3B2A01A61BFDA0F6FD1FE95B5366F7334C4BC0580",
            "name": "Crescent",
            "display": "cre",
            "symbol": "CRE",
            "ibc": {
                "source_channel": "channel-9",
                "dst_channel": "channel-297",
                "source_denom": "ucre"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/crescent/images/cre.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/crescent/images/cre.svg"
            },
            "coingecko_id": "crescent-network"
        },
        {
            "description": "The native token of Lumen Network",
            "denom_units": [
                {
                    "denom": "ibc/FFA652599C77E853F017193E36B5AB2D4D9AFC4B54721A74904F80C9236BF3B7",
                    "exponent": 0,
                    "aliases": ["ulumen"]
                },
                {
                    "denom": "lumen",
                    "exponent": 6
                }
            ],
            "base": "ibc/FFA652599C77E853F017193E36B5AB2D4D9AFC4B54721A74904F80C9236BF3B7",
            "name": "LumenX",
            "display": "lumen",
            "symbol": "LUMEN",
            "ibc": {
                "source_channel": "channel-3",
                "dst_channel": "channel-286",
                "source_denom": "ulumen"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/lumenx/images/lumen.png"
            }
        },
        {
            "description": "The native token of Oraichain",
            "denom_units": [
                {
                    "denom": "ibc/161D7D62BAB3B9C39003334F1671208F43C06B643CC9EDBBE82B64793C857F1D",
                    "exponent": 0,
                    "aliases": ["orai"]
                },
                {
                    "denom": "ORAI",
                    "exponent": 6
                }
            ],
            "base": "ibc/161D7D62BAB3B9C39003334F1671208F43C06B643CC9EDBBE82B64793C857F1D",
            "name": "Oraichain",
            "display": "ORAI",
            "symbol": "ORAI",
            "ibc": {
                "source_channel": "channel-13",
                "dst_channel": "channel-216",
                "source_denom": "orai"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/oraichain/images/orai-white.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/oraichain/images/orai-white.svg"
            },
            "coingecko_id": "oraichain-token"
        },
        {
            "description": "BLD is the token used to secure the Agoric chain through staking and to backstop Inter Protocol.",
            "denom_units": [
                {
                    "denom": "ibc/2DA9C149E9AD2BD27FEFA635458FB37093C256C1A940392634A16BEA45262604",
                    "exponent": 0,
                    "aliases": ["ubld"]
                },
                {
                    "denom": "bld",
                    "exponent": 6
                }
            ],
            "base": "ibc/2DA9C149E9AD2BD27FEFA635458FB37093C256C1A940392634A16BEA45262604",
            "name": "Agoric",
            "display": "bld",
            "symbol": "BLD",
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/agoric/images/bld.png"
            },
            "ibc": {
                "source_channel": "channel-1",
                "dst_channel": "channel-320",
                "source_denom": "ubld"
            }
        },
        {
            "description": "The native token of the Cudos blockchain",
            "denom_units": [
                {
                    "denom": "ibc/E09ED39F390EC51FA9F3F69BEA08B5BBE6A48B3057B2B1C3467FAAE9E58B021B",
                    "exponent": 0,
                    "aliases": ["acudos"]
                },
                {
                    "denom": "cudos",
                    "exponent": 18
                }
            ],
            "base": "ibc/E09ED39F390EC51FA9F3F69BEA08B5BBE6A48B3057B2B1C3467FAAE9E58B021B",
            "name": "Cudos",
            "display": "cudos",
            "symbol": "CUDOS",
            "ibc": {
                "source_channel": "channel-1",
                "dst_channel": "channel-298",
                "source_denom": "acudos"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/cudos/images/cudos.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/cudos/images/cudos.svg"
            },
            "coingecko_id": "cudos"
        },
        {
            "description": "The native stablecoin of Kava",
            "denom_units": [
                {
                    "denom": "ibc/C78F65E1648A3DFE0BAEB6C4CDA69CC2A75437F1793C0E6386DFDA26393790AE",
                    "exponent": 0,
                    "aliases": ["usdx"]
                },
                {
                    "denom": "USDX",
                    "exponent": 6
                }
            ],
            "base": "ibc/C78F65E1648A3DFE0BAEB6C4CDA69CC2A75437F1793C0E6386DFDA26393790AE",
            "name": "USDX",
            "display": "USDX",
            "symbol": "USDX",
            "ibc": {
                "source_channel": "channel-1",
                "dst_channel": "channel-143",
                "source_denom": "usdx"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/kava/images/usdx.png"
            },
            "coingecko_id": "usdx"
        },
        {
            "description": "Staking derivative seJUNO for staked JUNO",
            "type_asset": "cw20",
            "address": "juno1dd0k0um5rqncfueza62w9sentdfh3ec4nw4aq4lk5hkjl63vljqscth9gv",
            "denom_units": [
                {
                    "denom": "ibc/C6B6BFCB6EE49A7CAB1A7E7B021DE35B99D525AC660844952F0F6C78DCB2A57B",
                    "exponent": 0,
                    "aliases": [
                        "cw20:juno1dd0k0um5rqncfueza62w9sentdfh3ec4nw4aq4lk5hkjl63vljqscth9gv"
                    ]
                },
                {
                    "denom": "sejuno",
                    "exponent": 6
                }
            ],
            "base": "ibc/C6B6BFCB6EE49A7CAB1A7E7B021DE35B99D525AC660844952F0F6C78DCB2A57B",
            "name": "StakeEasy seJUNO",
            "display": "sejuno",
            "symbol": "seJUNO",
            "ibc": {
                "source_channel": "channel-47",
                "dst_channel": "channel-169",
                "source_denom": "cw20:juno1dd0k0um5rqncfueza62w9sentdfh3ec4nw4aq4lk5hkjl63vljqscth9gv"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/sejuno.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/sejuno.svg"
            }
        },
        {
            "description": "Staking derivative bJUNO for staked JUNO",
            "type_asset": "cw20",
            "address": "juno1wwnhkagvcd3tjz6f8vsdsw5plqnw8qy2aj3rrhqr2axvktzv9q2qz8jxn3",
            "denom_units": [
                {
                    "denom": "ibc/C2DF5C3949CA835B221C575625991F09BAB4E48FB9C11A4EE357194F736111E3",
                    "exponent": 0,
                    "aliases": [
                        "cw20:juno1wwnhkagvcd3tjz6f8vsdsw5plqnw8qy2aj3rrhqr2axvktzv9q2qz8jxn3"
                    ]
                },
                {
                    "denom": "bjuno",
                    "exponent": 6
                }
            ],
            "base": "ibc/C2DF5C3949CA835B221C575625991F09BAB4E48FB9C11A4EE357194F736111E3",
            "name": "StakeEasy bJUNO",
            "display": "bjuno",
            "symbol": "bJUNO",
            "ibc": {
                "source_channel": "channel-47",
                "dst_channel": "channel-169",
                "source_denom": "cw20:juno1wwnhkagvcd3tjz6f8vsdsw5plqnw8qy2aj3rrhqr2axvktzv9q2qz8jxn3"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/bjuno.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/bjuno.svg"
            }
        },
        {
            "description": "The native token of Stride",
            "denom_units": [
                {
                    "denom": "ibc/A8CA5EE328FA10C9519DF6057DA1F69682D28F7D0F5CCC7ECB72E3DCA2D157A4",
                    "exponent": 0,
                    "aliases": ["ustrd"]
                },
                {
                    "denom": "strd",
                    "exponent": 6,
                    "aliases": []
                }
            ],
            "base": "ibc/A8CA5EE328FA10C9519DF6057DA1F69682D28F7D0F5CCC7ECB72E3DCA2D157A4",
            "name": "Stride",
            "display": "strd",
            "symbol": "STRD",
            "ibc": {
                "source_channel": "channel-5",
                "dst_channel": "channel-326",
                "source_denom": "ustrd"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/strd.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/strd.svg"
            },
            "coingecko_id": "stride"
        },
        {
            "description": "Staking derivative stATOM for staked ATOM by Stride",
            "denom_units": [
                {
                    "denom": "ibc/C140AFD542AE77BD7DCC83F13FDD8C5E5BB8C4929785E6EC2F4C636F98F17901",
                    "exponent": 0,
                    "aliases": ["stuatom"]
                },
                {
                    "denom": "statom",
                    "exponent": 6
                }
            ],
            "base": "ibc/C140AFD542AE77BD7DCC83F13FDD8C5E5BB8C4929785E6EC2F4C636F98F17901",
            "name": "Stride Staked Atom",
            "display": "statom",
            "symbol": "stATOM",
            "ibc": {
                "source_channel": "channel-5",
                "dst_channel": "channel-326",
                "source_denom": "stuatom"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/statom.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/statom.svg"
            },
            "coingecko_id": "stride-staked-atom"
        },
        {
            "description": "Staking derivative stSTARS for staked STARS by Stride",
            "denom_units": [
                {
                    "denom": "ibc/5DD1F95ED336014D00CE2520977EC71566D282F9749170ADC83A392E0EA7426A",
                    "exponent": 0,
                    "aliases": ["stustars"]
                },
                {
                    "denom": "ststars",
                    "exponent": 6
                }
            ],
            "base": "ibc/5DD1F95ED336014D00CE2520977EC71566D282F9749170ADC83A392E0EA7426A",
            "name": "Stride Staked Stars",
            "display": "ststars",
            "symbol": "stSTARS",
            "ibc": {
                "source_channel": "channel-5",
                "dst_channel": "channel-326",
                "source_denom": "stustars"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/ststars.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/ststars.svg"
            }
        },
        {
            "description": "Solarbank DAO Governance Token for speeding up the shift to renewable and green energy",
            "type_asset": "cw20",
            "address": "juno159q8t5g02744lxq8lfmcn6f78qqulq9wn3y9w7lxjgkz4e0a6kvsfvapse",
            "denom_units": [
                {
                    "denom": "ibc/C3FC4DED273E7D1DD2E7BAA3317EC9A53CD3252B577AA33DC00D9DF2BDF3ED5C",
                    "exponent": 0,
                    "aliases": [
                        "cw20:juno159q8t5g02744lxq8lfmcn6f78qqulq9wn3y9w7lxjgkz4e0a6kvsfvapse"
                    ]
                },
                {
                    "denom": "solar",
                    "exponent": 6
                }
            ],
            "base": "ibc/C3FC4DED273E7D1DD2E7BAA3317EC9A53CD3252B577AA33DC00D9DF2BDF3ED5C",
            "name": "Solarbank DAO",
            "display": "solar",
            "symbol": "SOLAR",
            "ibc": {
                "source_channel": "channel-47",
                "dst_channel": "channel-169",
                "source_denom": "cw20:juno159q8t5g02744lxq8lfmcn6f78qqulq9wn3y9w7lxjgkz4e0a6kvsfvapse"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/solar.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/solar.svg"
            }
        },
        {
            "description": "StakeEasy governance token",
            "type_asset": "cw20",
            "address": "juno19rqljkh95gh40s7qdx40ksx3zq5tm4qsmsrdz9smw668x9zdr3lqtg33mf",
            "denom_units": [
                {
                    "denom": "ibc/18A676A074F73B9B42DA4F9DFC8E5AEF334C9A6636DDEC8D34682F52F1DECDF6",
                    "exponent": 0,
                    "aliases": [
                        "cw20:juno19rqljkh95gh40s7qdx40ksx3zq5tm4qsmsrdz9smw668x9zdr3lqtg33mf"
                    ]
                },
                {
                    "denom": "seasy",
                    "exponent": 6
                }
            ],
            "base": "ibc/18A676A074F73B9B42DA4F9DFC8E5AEF334C9A6636DDEC8D34682F52F1DECDF6",
            "name": "StakeEasy SEASY",
            "display": "seasy",
            "symbol": "SEASY",
            "ibc": {
                "source_channel": "channel-47",
                "dst_channel": "channel-169",
                "source_denom": "cw20:juno19rqljkh95gh40s7qdx40ksx3zq5tm4qsmsrdz9smw668x9zdr3lqtg33mf"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/seasy.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/seasy.svg"
            }
        },
        {
            "description": "The native staking and governance token of the Axelar chain",
            "denom_units": [
                {
                    "denom": "ibc/903A61A498756EA560B85A85132D3AEE21B5DEDD41213725D22ABF276EA6945E",
                    "exponent": 0,
                    "aliases": ["uaxl"]
                },
                {
                    "denom": "axl",
                    "exponent": 6
                }
            ],
            "base": "ibc/903A61A498756EA560B85A85132D3AEE21B5DEDD41213725D22ABF276EA6945E",
            "name": "Axelar",
            "display": "axl",
            "symbol": "AXL",
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/axelarnetwork/axelar-docs/main/public/images/assets/axl.png",
                "svg": "https://raw.githubusercontent.com/axelarnetwork/axelar-docs/main/public/images/assets/axl.svg"
            },
            "ibc": {
                "source_channel": "channel-3",
                "dst_channel": "channel-208",
                "source_denom": "uaxl"
            },
            "coingecko_id": "axelar"
        },
        {
            "description": "REBUS coin is the token for the Rebuschain Platform",
            "denom_units": [
                {
                    "denom": "ibc/A1AC7F9EE2F643A68E3A35BCEB22040120BEA4059773BB56985C76BDFEBC71D9",
                    "exponent": 0,
                    "aliases": ["arebus"]
                },
                {
                    "denom": "rebus",
                    "exponent": 18
                }
            ],
            "base": "ibc/A1AC7F9EE2F643A68E3A35BCEB22040120BEA4059773BB56985C76BDFEBC71D9",
            "name": "Rebuschain",
            "display": "rebus",
            "symbol": "REBUS",
            "ibc": {
                "source_channel": "channel-0",
                "dst_channel": "channel-355",
                "source_denom": "arebus"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/rebus/images/rebus.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/rebus/images/rebus.svg"
            },
            "coingecko_id": "rebus"
        },
        {
            "description": "The native staking and governance token of the Teritori chain",
            "denom_units": [
                {
                    "denom": "ibc/EB7FB9C8B425F289B63703413327C2051030E848CE4EAAEA2E51199D6D39D3EC",
                    "exponent": 0,
                    "aliases": ["utori"]
                },
                {
                    "denom": "tori",
                    "exponent": 6
                }
            ],
            "base": "ibc/EB7FB9C8B425F289B63703413327C2051030E848CE4EAAEA2E51199D6D39D3EC",
            "name": "teritori",
            "display": "tori",
            "symbol": "TORI",
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/teritori/images/utori.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/teritori/images/tori.svg"
            },
            "ibc": {
                "source_channel": "channel-0",
                "dst_channel": "channel-362",
                "source_denom": "utori"
            },
            "coingecko_id": ""
        },
        {
            "description": "Staking derivative stJUNO for staked JUNO by Stride",
            "denom_units": [
                {
                    "denom": "ibc/84502A75BCA4A5F68D464C00B3F610CE2585847D59B52E5FFB7C3C9D2DDCD3FE",
                    "exponent": 0,
                    "aliases": ["stujuno"]
                },
                {
                    "denom": "stjuno",
                    "exponent": 6
                }
            ],
            "base": "ibc/84502A75BCA4A5F68D464C00B3F610CE2585847D59B52E5FFB7C3C9D2DDCD3FE",
            "name": "Stride Juno",
            "display": "stjuno",
            "symbol": "stJUNO",
            "ibc": {
                "source_channel": "channel-5",
                "dst_channel": "channel-326",
                "source_denom": "stujuno"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/stjuno.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/stride/images/stjuno.svg"
            }
        },
        {
            "description": "The native token of Lambda",
            "denom_units": [
                {
                    "denom": "ibc/80825E8F04B12D914ABEADB1F4D39C04755B12C8402F6876EE3168450C0A90BB",
                    "exponent": 0,
                    "aliases": ["ulamb"]
                },
                {
                    "denom": "lamb",
                    "exponent": 18
                }
            ],
            "base": "ibc/80825E8F04B12D914ABEADB1F4D39C04755B12C8402F6876EE3168450C0A90BB",
            "name": "Lambda",
            "display": "lamb",
            "symbol": "LAMB",
            "ibc": {
                "source_channel": "channel-2",
                "dst_channel": "channel-378",
                "source_denom": "ulamb"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/lambda/images/lambda.png"
            },
            "coingecko_id": "lambda"
        },
        {
            "description": "MUSE Governance Token",
            "type_asset": "cw20",
            "address": "juno1p8x807f6h222ur0vssqy3qk6mcpa40gw2pchquz5atl935t7kvyq894ne3",
            "denom_units": [
                {
                    "denom": "ibc/6B982170CE024689E8DD0E7555B129B488005130D4EDA426733D552D10B36D8F",
                    "exponent": 0,
                    "aliases": [
                        "cw20:juno1p8x807f6h222ur0vssqy3qk6mcpa40gw2pchquz5atl935t7kvyq894ne3"
                    ]
                },
                {
                    "denom": "muse",
                    "exponent": 6
                }
            ],
            "base": "ibc/6B982170CE024689E8DD0E7555B129B488005130D4EDA426733D552D10B36D8F",
            "name": "MUSE",
            "display": "muse",
            "symbol": "MUSE",
            "ibc": {
                "source_channel": "channel-47",
                "dst_channel": "channel-169",
                "source_denom": "cw20:juno1p8x807f6h222ur0vssqy3qk6mcpa40gw2pchquz5atl935t7kvyq894ne3"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/juno/images/muse.png"
            }
        },
        {
            "description": "Jackal Native Token",
            "denom_units": [
                {
                    "denom": "ibc/8E697BDABE97ACE8773C6DF7402B2D1D5104DD1EEABE12608E3469B7F64C15BA",
                    "exponent": 0,
                    "aliases": ["ujkl"]
                },
                {
                    "denom": "jkl",
                    "exponent": 6
                }
            ],
            "base": "ibc/8E697BDABE97ACE8773C6DF7402B2D1D5104DD1EEABE12608E3469B7F64C15BA",
            "name": "Jackal",
            "display": "jkl",
            "symbol": "JKL",
            "ibc": {
                "source_channel": "channel-0",
                "dst_channel": "channel-412",
                "source_denom": "ujkl"
            },
            "logo_URIs": {
                "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/jackal/images/jkl.png",
                "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/jackal/images/jkl.svg"

            },
            "coingecko_id": ""
        }
    ]
}
