import styled from 'styled-components';
import { Filter, SearchBar } from './components/ui';
import { useQuery, gql } from '@apollo/client';
import { Spinner } from './styles/element';
import { groupByDate } from './utils/list';
import { useEffect, useState } from 'react';
import { List } from './components/List';
import Group from './components/group';

const GET_DATASET = gql`
  # query GetDataSet($limit: Int, $sort: String, $order: String) {
  query GetDataSet {
    # histories(limit: $limit, sort: $sort, order: $order) {
    #   id
    #   title
    #   date: event_date_utc
    # }
    histories {
      id
      date
      name
      description
      amount
      status
      type
    }
  }
`

const filters = [{
  name: 'type',
  options: ['Credit', 'Debit']
}, {
  name: 'status',
  options: ['COMPLETED', 'DECLINED']
}]

function App() {
  const { loading, error, data } = useQuery(GET_DATASET);
  const [group, setGroup] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterTerms, setFilterTerms] = useState({});

  const toggleFilter = (name, value) => {
    setFilterTerms({
      ...filterTerms,
      [name]: value
    })
  }

  useEffect(() => {
    if (data?.histories && filterTerms) {
      filterData();
    }
  }, [data, filterTerms])

  useEffect(() => {
    if (filtered) {
      setGroup(groupByDate(filtered, 'date'));
    }
  }, [filtered])

  const filterData = () => {
    const filtered = data.histories.filter(item => {
      return Object.keys(filterTerms).every(key => {
        return filterTerms[key] === null || item[key] === filterTerms[key]
      })
    })
    setFiltered(filtered);
  }

  if (loading) { 
    return (
      <VoidWrapper><Spinner /></VoidWrapper>
    );
  }

  if (error) {
    return (
      <VoidWrapper><p>{'Error :('}</p></VoidWrapper>
    );
  }

  const onSearchChange = (e) => {
    const search = e.target.value.toLowerCase();
    const _filtered = []
    filtered.forEach((item) => {
      for (let key in item) {
        if (key === "id") {
          continue;
        }
        if (item[key].toString().toLowerCase().includes(search)) {
          _filtered.push(item);
          break;
        }
      }
    })
    setGroup(groupByDate(_filtered, 'date'));
  }

  return (
    <Container>
      <SearchBar onChange={onSearchChange} />
      <FilterWrapper>
        <div className={'filter__content'}>
        {
          filters.map((filter) => (
            filter.options.map((option, index) => (
              <Filter
                key={index}
                name={option}
                checked={filterTerms[filter.name] === option}
                onChange={(checked) => toggleFilter(filter.name, checked ? option : null)} />
              ))
          ))
        }
        </div>
      </FilterWrapper>
      <ListWrapper>
        <List data={group} aliasName="items" component={Group} />
      </ListWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: min(100%, 800px);
  min-height: 100vh;
  margin-inline: auto;
  padding: min(5%, 70px) 1rem 1rem 1rem;
`;

const FilterWrapper = styled.div`
  width: 100%;
  margin-top: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;

  & > .filter__content {
    display: flex;
    flex-wrap: nowrap;
    gap: 0.5rem;
  }
`

const VoidWrapper = styled.div`
  width: 100%;
  height: min(100vh, 400px);
  display: grid;
  place-items: center;

  p {
    font-size: ${(props) => props.theme.font.larger}px;
    color: ${(props) => props.theme.colors.placeholder};
  }
`

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  padding-block: 2rem;
  padding-bottom: 10rem;
`

export default App;
