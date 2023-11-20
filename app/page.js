'use client';
import Image from 'next/image'
import { useState, useEffect } from 'react';


export default function Home() {

  const [dataClay, setDataClay] = useState([]);
  const [dataBrick, setDataBrick] = useState([]);
  const [dataSalt, setDataSalt] = useState([]);
  const [dataConstructionPowder, setDataConstructionPowder] = useState([]);
  const [dataHotato, setDataHotato] = useState([]);
  const [dataCookingMix, setDataCookingMix] = useState(10);
  const [dataHotka, setDataHotka] = useState([]);
  
  useEffect(() => {
    const fetchData = async (url, setData, multiplier) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
  
        // Filter active listings
        const activeListings = data.listings.filter(listing => listing.state === 'active');
  
        // Sort by price
        const sortedListings = activeListings.sort((a, b) => a.price - b.price);
  
        // Get the first 5 listings
        const firstThreeListngs = sortedListings.slice(0, 3);
  
        // Calculate the average price
        const averagePrice = parseFloat((firstThreeListngs.reduce((total, listing) => total + listing.price, 0) / firstThreeListngs.length).toFixed(2));
  
        // Set the average price in state
        setData(averagePrice * multiplier);
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
  }, []);

  function calculateBtoE (profit, energy) {
    return (profit / energy).toFixed(2);
  }

  function calculateProfit (sellPrice, buyPrice) {
    return (sellPrice - buyPrice).toFixed(2);
  }

  function calculateTotal (price1, price2) {
    return (price1 + price2).toFixed(2);
  }

  function isWorth (btoe) {
    let worth = btoe > 4 ? 'Yes' : 'No'
    return worth;
  }

  function TableRow({ index, process, material1, material2, price1, price2, product, sellPrice, energy, calculateTotal, calculateProfit, calculateBtoE, isWorth }) {
    const totalCost = calculateTotal(price1, price2 || 0);
    const profit = calculateProfit(sellPrice, totalCost);
    const btoe = calculateBtoE(profit, energy);
    const worth = isWorth(btoe);
  
    const profitClass = profit > 0 ? 'bg-green-500' : 'bg-red-500 text-black';
    const worthClass = worth === 'No' ? 'bg-yellow-500' : '';
  
    return (
      <tr className={`${index % 2 === 0 ? "" : "hover"} ${profitClass} ${worthClass}`}>
        <th>{index + 1}</th>
        <td>{process}</td>
        <td>{material1}</td>
        <td>{price1}</td>
        <td>{material2 || ""}</td>
        <td>{price2 || ""}</td>
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
            index={1}
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
          </tbody>
        </table>
    </div>
    </div>
  )

}
