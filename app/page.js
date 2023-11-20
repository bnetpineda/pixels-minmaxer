'use client';
import Image from 'next/image'
import { useState, useEffect } from 'react';


export default function Home() {

  const [dataWaterMintSeed, setDataWaterMintSeed] = useState(12);
  const [dataWaterMint, setDataWaterMint] = useState(24);
  const [dataHotatoSeed, setHotatoSeed] = useState(14);
  const [dataCookingMix, setDataCookingMix] = useState(10);
  const [dataCraftingMix, setDataCraftingMix] = useState(100);

  const [dataClay, setDataClay] = useState([]);
  const [dataBrick, setDataBrick] = useState([]);
  const [dataSalt, setDataSalt] = useState([]);
  const [dataConstructionPowder, setDataConstructionPowder] = useState([]);
  const [dataHotato, setDataHotato] = useState([]);
  const [dataHotka, setDataHotka] = useState([]);
  const [dataEnergyDrink, setDataEnergyDrink] = useState([]);
  const [dataPopberryWine, setDataPopberryWine] = useState([]);
  const [dataPopberry, setDataPopberry] = useState([]);
  const [dataQueenBee, setDataQueenBee] = useState([]);
  const [dataVoidtonium, setDataVoidtonium] = useState([]);
  
  
  useEffect(() => {
    const fetchData = async (url, setData, multiplier) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
  
        // Filter active listings
        const activeListings = data.listings.filter(listing => listing.state === 'active');
  
        // Sort by price
        const sortedListings = activeListings.sort((a, b) => a.price - b.price);

        let firstListings;
        if(sortedListings[0].itemId === "itm_popberryFruit"){
          firstListings = sortedListings.slice(3, 15);
        }
        else {
          firstListings = sortedListings.slice(0, 3);
        }
  
        // Calculate the average price
        const averagePrice = parseFloat((firstListings.reduce((total, listing) => total + listing.price, 0) / firstListings.length).toFixed(2));
  
        // Set the average price in state
        setData((averagePrice * multiplier).toFixed(2));
      } catch (error) {
        console.error('Fetch failed:', error);
      }
    };
    
    fetchData('https://pixels-server.pixels.xyz/v1/marketplace/item/itm_clay', setDataClay, 1);
    fetchData('https://pixels-server.pixels.xyz/v1/marketplace/item/itm_brick', setDataBrick, 1);
    fetchData('https://pixels-server.pixels.xyz/v1/marketplace/item/itm_Marble', setDataSalt, 1)
    fetchData('https://pixels-server.pixels.xyz/v1/marketplace/item/itm_constructionPowder', setDataConstructionPowder, 1)
    fetchData('https://pixels-server.pixels.xyz/v1/marketplace/item/itm_hotato', setDataHotato, 1)
    fetchData('https://pixels-server.pixels.xyz/v1/marketplace/item/itm_hotato_hotka', setDataHotka, 1)
    fetchData('https://pixels-server.pixels.xyz/v1/marketplace/item/itm_energyDrink', setDataEnergyDrink, 1)
    fetchData('https://pixels-server.pixels.xyz/v1/marketplace/item/itm_popberrywine', setDataPopberryWine, 1)
    fetchData('https://pixels-server.pixels.xyz/v1/marketplace/item/itm_popberryFruit', setDataPopberry, 1)
    fetchData('https://pixels-server.pixels.xyz/v1/marketplace/item/itm_queenbee', setDataQueenBee, 1)
    fetchData('https://pixels-server.pixels.xyz/v1/marketplace/item/itm_void', setDataVoidtonium, 1)

  }, []);

  function calculateBtoE (profit, energy) {
    return (profit / energy).toFixed(2);
  }

  function calculateProfit (sellPrice, buyPrice) {
    return (sellPrice - buyPrice).toFixed(2);
  }

  function isWorth (btoe) {
    let worth = btoe > 2 ? 'Yes' : 'No'
    return worth;
  }

  function calculateTotal (price1, price2, price3 = 0, price4 = 0) {
    return (price1 + price2 + price3 + price4).toFixed(2);
  }
  
  function TableRow({ index, process, material1, material2, material3, material4, price1, price2, price3, price4, product, sellPrice, energy, calculateTotal, calculateProfit, calculateBtoE, isWorth }) {
    const totalCost = parseInt(calculateTotal(price1, price2 || 0, price3 || 0, price4 || 0)).toFixed(2);
    const profit = calculateProfit(sellPrice, totalCost);
    const btoe = calculateBtoE(profit, energy);
    const worth = isWorth(btoe);
  
    const worthClass = worth === 'No' ? 'bg-yellow-500' : '';
    const profitClass = profit > 0 ? 'bg-green-500' : 'bg-red-500';
  
    return (
      <tr className={`${profitClass} ${worthClass}`}>
        <th>{index + 1}</th>
        <td>{process}</td>
        <td>{material1}</td>
        <td>{price1}</td>
        <td>{material2 || ""}</td>
        <td>{price2 || ""}</td>
        <td>{material3 || ""}</td>
        <td>{price3 || ""}</td>
        <td>{material4 || ""}</td>
        <td>{price4 || ""}</td>
        <td>{totalCost}</td>
        <td>{product}</td>
        <td>{sellPrice}</td>
        <td>{profit}</td>
        <td>{energy}</td>
        <td>{btoe}</td>
        <td>{worth}</td>
      </tr>
    );
  }

  return (
    <div className='flex flex-col'>
      <h1 className="text-4xl font-bold text-center">Pixels MinMax-er</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Process</th>
              <th>Raw Material 1</th>
              <th>Price Average</th>
              <th>Raw Material 2</th>
              <th>Price Average</th>
              <th>Raw Material 3</th>
              <th>Price Average</th>
              <th>Raw Material 4</th>
              <th>Price Average</th>
              <th>Total</th>
              <th>Material Produced</th>
              <th>Sell Price</th>
              <th>Profit</th>
              <th>Energy Needed</th>
              <th>B/E</th>
              <th>Worth?</th>
            </tr>
          </thead>
          <tbody>
          <TableRow
            index={0}
            process="Clay to Bricks"
            material1="Clay x36"
            price1={dataClay * 36}
            product="Bricks x12"
            sellPrice={dataBrick * 12}
            energy={30}
            calculateTotal={calculateTotal}
            calculateProfit={calculateProfit}
            calculateBtoE={calculateBtoE}
            isWorth={isWorth}
          />
          <TableRow
            index={1}
            process="Construction Powder"
            material1="Bricks x2"
            price1={dataBrick * 2}
            material2="Salt Blocks x4"
            price2={dataSalt * 4}
            product="Construction Powder x1"
            sellPrice={dataConstructionPowder}
            energy={6}
            calculateTotal={calculateTotal}
            calculateProfit={calculateProfit}
            calculateBtoE={calculateBtoE}
            isWorth={isWorth}
          />
          <TableRow
            index={2}
            process="Hotka"
            material1="Hotato x24"
            price1={dataHotato * 24}
            material2="Cooking Mix x10"
            price2={dataCookingMix * 10}
            product="Hotka x1"
            sellPrice={dataHotka}
            energy={2}
            calculateTotal={calculateTotal}
            calculateProfit={calculateProfit}
            calculateBtoE={calculateBtoE}
            isWorth={isWorth}
          />
          <TableRow
            index={3}
            process="Watermint Farming w/ Energy Drink"
            material1="WatermintSeed x60"
            price1={dataWaterMint * 60}
            material2="Energy Drink x10"
            price2={dataEnergyDrink * 10}
            product="Watermint x60"
            sellPrice={dataWaterMint * 60}
            energy={440}
            calculateTotal={calculateTotal}
            calculateProfit={calculateProfit}
            calculateBtoE={calculateBtoE}
            isWorth={isWorth}
          />
          <TableRow
            index={4}
            process="Hotato Farming w/ Energy Drink"
            material1="HotatoSeed x60"
            price1={dataHotatoSeed * 60}
            material2="Energy Drink x10"
            price2={dataEnergyDrink * 10}
            product="Hotato x60"
            sellPrice={dataHotato * 60}
            energy={630}
            calculateTotal={calculateTotal}
            calculateProfit={calculateProfit}
            calculateBtoE={calculateBtoE}
            isWorth={isWorth}
          />
          <TableRow
            index={5}
            process="Popberry Wine"
            material1="Popberry x24"
            price1={dataPopberry * 24}
            material2="Cooking Mix x10"
            price2={dataCookingMix * 10}
            product="PopberryWine x1"
            sellPrice={dataPopberryWine * 1}
            energy={2}
            calculateTotal={calculateTotal}
            calculateProfit={calculateProfit}
            calculateBtoE={calculateBtoE}
            isWorth={isWorth}
          />
          <TableRow
            index={6}
            process="Pure Hotato"
            material1="Construction Powder x3"
            price1={dataConstructionPowder * 3}
            material2="Crafting Mix x3"
            price2={dataCraftingMix * 3}
            material3="Queen Bee x1"
            price3={dataQueenBee * 1}
            material4="Voidtonium x1.25"
            price4={dataVoidtonium * 1.25}
            product="Hotato x100"
            sellPrice={dataHotato * 100}
            energy={1050}
            calculateTotal={calculateTotal}
            calculateProfit={calculateProfit}
            calculateBtoE={calculateBtoE}
            isWorth={isWorth}
          />
          </tbody>
        </table>
    </div>
    </div>
  )

}
