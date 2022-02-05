import React, { Component } from 'react';
import { pokemonData } from './pokemonData';
import './App.css';
class App extends Component {
  render() {
    const baseCSS = new Map(Object.entries({
      basicGridCSSClassName: 'basic-grid',
      evoLineContainerCSSClassName: 'evo-line-container',
      evoProfileCSSClassName: 'evo-profile',
      firstListCSSClassName: 'firstList',
      firstListItemCSSClassName: 'firstListItem',
      flipCardBackCSSClassName: 'flip-card-back',
      flipCardCSSClassName: 'flip-card',
      flipCardFrontCSSClassName: 'flip-card-front',
      flipCardFrontTypesCSSClassName:'front-types',
      flipCardInnerCSSClassName: 'flip-card-inner',
      lastListCSSClassName: 'lastList',
      lastListItemCSSClassName: 'lastListItem',
      middleListCSSClassName: 'middleList',
      middleListItemCSSClassName: 'middleListItem',
      typesContainerCSSClassName: 'types-container',
      weaknessesContainerCSSClassName: 'weaknesses-container'}));

    return (
      <PokemonGrid
        baseCSS={baseCSS}
        pokemons={pokemonData}
      />
    );
  }
}

function PokemonGrid({ baseCSS, pokemons }) {
  return (
    <section className={`${baseCSS.get('basicGridCSSClassName')}`}>
      {pokemons.map((pokemon) => {
        return <PokemonFlipCard baseCSS={baseCSS} key={pokemon.id} pokemon={pokemon} />
      })}
    </section>
  )
}

function PokemonFlipCard({ baseCSS, pokemon }) {
  return (
    <div className={`${baseCSS.get('flipCardCSSClassName')} ${pokemon.typeList[pokemon.typeList.length - 1].toLowerCase()}-border`} id={pokemon.id}>
      <FlipCardInner
        baseCSS={baseCSS}
        pokemon={pokemon}
      />
    </div>
  )
}

function FlipCardInner({ baseCSS, pokemon }) {
  return (
    <div className={baseCSS.get('flipCardInnerCSSClassName')}>
      <FlipCardFront
        baseCSS={baseCSS}
        pokemon={pokemon}
      />
      <FlipCardBack
        baseCSS={baseCSS}
        pokemon={pokemon}
      />
    </div>
  )
}

function FlipCardFront({ baseCSS, pokemon }) {
  const stringId = getStringId(pokemon.id);

  return (
    <div className={`${baseCSS.get('flipCardFrontCSSClassName')} ${pokemon.typeList[0].toLowerCase()}-front-theme`}>
      <img alt={pokemon.name} src={`./images/pokemon/${stringId}.png`} />
      <FlipCardFrontTypes baseCSS={baseCSS} pokemon={pokemon} />
    </div>
  )
}

function FlipCardFrontTypes({ baseCSS, pokemon }) {
  return (
    <div className={`${baseCSS.get('flipCardFrontTypesCSSClassName')}`}>
      <ul>
        {
          pokemon.typeList.map((type) => {
            return <ListItem key={type} type={type} />;
          })
        }
      </ul>
    </div>
  )
}

function FlipCardBack({ baseCSS, pokemon }) {
  return (
    <div className={`${baseCSS.get('flipCardBackCSSClassName')} ${pokemon.typeList[0].toLowerCase()}-back-theme`}>
      <FlipCardBackHeader
        pokemon={pokemon}
      />
      <FlipCardBackEvoLine
        baseCSS={baseCSS}
        pokemon={pokemon}
      />
      <FlipCardBackTypes
        baseCSS={baseCSS}
        pokemon={pokemon}
      />
      <FlipCardBackWeaknesses
        baseCSS={baseCSS}
        pokemon={pokemon}
      />
    </div>
  )
}

function FlipCardBackHeader({ pokemon }) {
  const stringId = getStringId(pokemon.id);

  return (
    <section>
      <h1>{`${stringId} ${pokemon.name}`}</h1>
    </section>
  )
}

function FlipCardBackEvoLine({ baseCSS, pokemon }) {
  if (pokemon.evoLine.length > 0) {
    return (
      <section>
        <h1>Evolutionary Line</h1>
        <div className={baseCSS.get('evoLineContainerCSSClassName')}>
          <EvoList baseCSS={baseCSS} pokemon={pokemon} />
        </div>
      </section>
    )
  } else {
    return (
      <section>
        <h1>Evolutionary Line</h1>
        <div className={baseCSS.get('evoLineContainerCSSClassName')}>
          <p>No evolution line</p>
        </div>
      </section>
    )
  }
}

function FlipCardBackTypes({ baseCSS, pokemon }) {
  return (
    <section>
      <h1>Types</h1>
      <div className={baseCSS.get('typesContainerCSSClassName')}>
        {
          pokemon.typeList.map((type) => {
            return <img alt={type} key={type} src={`./images/types/${type}.png`} />
          })
        }
      </div>
    </section>
  )
}

function FlipCardBackWeaknesses({ baseCSS, pokemon }) {
  return (
    <section>
      <h1>Weaknesses</h1>
      <div className={baseCSS.get('weaknessesContainerCSSClassName')}>
        {
          pokemon.weaknesses.map((weakness) => {
            return <img alt={weakness} key={weakness} src={`./images/types/${weakness}.png`} />
          })
        }
      </div>
    </section>
  )
}

function EvoList({ baseCSS, pokemon }) {
  if (!pokemon || (typeof pokemon !== 'object')) {
    return null;
  }

  const evoLineLength = pokemon.evoLine.length;
  const firstId = pokemon.evoLine[0];
  const multiEvolveValue = pokemon.multiEvolve;
  const indexToSliceOn = (multiEvolveValue) ? evoLineLength - multiEvolveValue : evoLineLength - 1;
  const lastIds = pokemon.evoLine.slice(indexToSliceOn);
  const middleIds = pokemon.evoLine.slice(1, (getMiddleRange(evoLineLength, multiEvolveValue)))

  if (middleIds.length > 0) {
    return (
      <ul className={`${baseCSS.get('evoProfileCSSClassName')}`}>
        <FirstList baseCSS={baseCSS} firstId={firstId} />
        <MiddleList baseCSS={baseCSS} middleIds={middleIds} />
        <LastList baseCSS={baseCSS} lastIds={lastIds} />
      </ul>
    )
  } else {
    return (
      <ul className={`${baseCSS.get('evoProfileCSSClassName')}`}>
        <FirstList baseCSS={baseCSS} firstId={firstId} />
        <LastList baseCSS={baseCSS} lastIds={lastIds} />
      </ul>
    )
  }
}

function getMiddleRange(evoLineLength, multiEvolveValue) {
  if (evoLineLength === 3 && !multiEvolveValue) {
    return 2;
  }

  return evoLineLength - multiEvolveValue;
}

function FirstList({ baseCSS, firstId }) {
  return (
    <ListItem cssClass={`${baseCSS.get('firstListCSSClassName')}`} evoId={firstId} key={firstId} />
  )
}

function LastList({ baseCSS, lastIds }) {
  if (lastIds.length > 1) {
    return (
      <li className={`${baseCSS.get('lastListCSSClassName')}`}>
        <ul>
          {lastIds.map((id) => {
            return <ListItem cssClass={`${baseCSS.get('lastListItemCSSClassName')}`} evoId={id} key={id} />
          })}
        </ul>
      </li>
    )
  }
  return (
    lastIds.map((id) => {
      return <ListItem cssClass={`${baseCSS.get('lastListCSSClassName')}`} evoId={id} key={id} />
    })
  )
}

function MiddleList({ baseCSS, middleIds }) {
  return (
    middleIds.map((id) => {
      return <ListItem cssClass={`${baseCSS.get('middleListCSSClassName')}`} evoId={id} key={id} />
    })
  )
}

function ListItem({ cssClass, evoId, type }) {
  let imgString, altText, href;

  if (evoId && !type) {
    const stringId = getStringId(evoId);
    imgString = `./images/pokemon/mini/${stringId}.png`;
    href = `#${evoId}`;
    altText = (pokemonData[evoId - 1])
      ? pokemonData[evoId - 1].name
      : `No Data for Pokemon ${evoId}`;
  } else if (type && !evoId) {
    imgString = `./images/types/${type}_Symbol_Go.png`;
    altText = type;
  }

  if (!imgString) {
    return null;
  }

  return (
    <li className={cssClass}>
      <a href={href}>
        <img alt={altText} src={imgString} />
      </a>
    </li>
  )
}

function getStringId(id) {
  let stringId = id.toString();

  if (id < 100) {
    stringId = stringId.padStart(3, '0');
  }

  return stringId;
}

export default App;