import React from "react";
import styled from "styled-components";
import { withKnobs } from "@storybook/addon-knobs";
import {
  Button,
  Heading,
  HorizontalRule,
  ImageButton,
  ImageButtonGrid,
  SizeButton,
  WidgetsBar,
  TopicsGrid,
  Categories,
  FilterButtonGroup,
  FilterButtonGroupMain,
  FilterButtonGroupPlaceholder,
  useTopicWidgetCategories,
  useTopicWidgets,
  useTopicWidgetSettings,
  useTopicWidgetSettingsActiveState
} from "@rawpixel-public/react-components";

import { topics } from "./topic-sidebar.data";
import SidebarButtonList from "../components/SidebarButtonList";

const StyledSidebar = styled.div`
  background: ${props => (props.isDAM ? "#FFF" : "#F4F4F4")};
  border-radius: 0.25em;
  display: flex;
  flex-direction: row;
  padding: 10px 0;
  width: 300px;

  .content {
    width: 220px;
    margin-left: 10px;
  }
`;

const SidebarHorizontalRule = () => <HorizontalRule style={{ width: "220px" }} />

const ExampleSidebar = ({ isTeam, isWebsiteCatalog }) => {
  const target = isTeam ? "team" : "website";
  const catalog = isTeam
    ? isWebsiteCatalog
      ? "website_content"
      : "team"
    : false;
  const { loading, widgets } = useTopicWidgets(target, catalog);

  const [topicData, setTopicData] = React.useState(topics);
  const [activeFilter, setActiveFilter] = React.useState(0);
  const [live, setLive] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [displayScore, setDisplayScore] = React.useState(false);
  const [tagMode, setTagMode] = React.useState(false);
  const activeWidget = !!widgets.length && widgets[activeFilter];
  const { categories, setActiveCategory } = useTopicWidgetCategories(
    activeWidget
  );
  const site = isTeam
    ? isWebsiteCatalog
      ? "dam-website"
      : "dam-team"
    : "website";

  const { main, fileTypes, filters, secondaryFilters } = useTopicWidgetSettings(
    site,
    activeWidget
  );

  const {
    activeFilters,
    setActiveFilters,
    isFilterActiveMapper,
    resetActiveFilters
  } = useTopicWidgetSettingsActiveState();

  const handleFilterClick = (e, filter) => {
    setActiveFilter(widgets.indexOf(filter));
  };

  const handleTopicClick = (e, topic) => {
    const index = topicData.indexOf(topic);
    const isTagged = !topic.isTagged;
    const loadingTopic = {
      ...topic,
      isLoading: true,
      isTagged
    };
    const updatedTopics = [...topicData];
    updatedTopics[index] = loadingTopic;
    setTopicData(updatedTopics);

    setTimeout(() => {
      const loadedTopic = {
        ...topic,
        isLoading: false,
        isTagged: !topicData[index].isTagged
      };
      const updatedTopics = [...topicData];
      updatedTopics[index] = loadedTopic;
      setTopicData(updatedTopics);
    }, 1500);
  };

  const handleFilterGroupButtonClick = (e, filter) => setActiveFilters(filter);

  return (
    <StyledSidebar isDAM={isTeam}>
      <div className="content">
        {isTeam && (
          <>
            <SidebarButtonList>
              <Button>Details</Button>
              <Button active>Topics</Button>
            </SidebarButtonList>
            {isWebsiteCatalog ? (
              <SidebarButtonList itemsPerRow={3}>
                <Button size="small">Boards</Button>
                <Button
                  active={tagMode}
                  size="small"
                  onClick={() => setTagMode(!tagMode)}
                >
                  Tag
                </Button>
                <Button
                  size="small"
                  active={displayScore}
                  onClick={() => setDisplayScore(!displayScore)}
                >
                  Scores
                </Button>
              </SidebarButtonList>
            ) : (
              <SidebarButtonList>
                <Button onClick={() => setTagMode(!tagMode)} active={tagMode}>
                  Tag
                </Button>
                <Button>Add crown</Button>
              </SidebarButtonList>
            )}
            {displayScore && (
              <>
                <SidebarButtonList>
                  <Button>leaves</Button>
                  <div
                    style={{
                      textAlign: "center",
                      padding: "5px 0",
                      color: "#bbb"
                    }}
                  >
                    {700 + score} ({score})
                  </div>
                </SidebarButtonList>
                <SidebarButtonList>
                  <Button onClick={() => setScore(score + 50)}>+50</Button>
                  <Button onClick={() => setScore(score - 50)}>-50</Button>
                </SidebarButtonList>
              </>
            )}
            <SidebarHorizontalRule />
          </>
        )}
        <Categories
          title={activeWidget.title}
          categories={categories}
          onCategoryClick={(e, category) => setActiveCategory(category)}
          showClear={!isTeam && activeFilters.length > 0}
          onClearClick={() => resetActiveFilters()}
          loading={loading}
        />
        <TopicsGrid
          topics={topicData}
          onTopicClick={handleTopicClick}
          isTagMode={isTeam && tagMode}
          loading={loading}
          viewable={isTeam ? 12 : 9}
          defaultHeight={isTeam ? 300 : 260}
        />
        {isTeam && (
          <>
            <SidebarHorizontalRule />
            <SidebarButtonList>
              <Button active={live} onClick={() => setLive(!live)}>
                Live
              </Button>
              <Button active={!live} onClick={() => setLive(!live)}>
                Unpublished
              </Button>
            </SidebarButtonList>
          </>
        )}
        <SidebarHorizontalRule />
        {loading && (
          <>
            <FilterButtonGroupPlaceholder />
            <SidebarHorizontalRule />
          </>
        )}
        {main && !!main.filter(i => i.published).length && (
          <>
            <FilterButtonGroupMain
              filters={main.map(isFilterActiveMapper)}
              onFilterClick={handleFilterGroupButtonClick}
            />
            <SidebarHorizontalRule />
          </>
        )}
        {loading && (
          <>
            <FilterButtonGroupPlaceholder hasTitle numberOfItems={5} />
            <SidebarHorizontalRule />
          </>
        )}
        {fileTypes && !!fileTypes.filter(i => i.published).length && (
          <>
            <FilterButtonGroup
              title="File types"
              filters={fileTypes.map(isFilterActiveMapper)}
              onFilterClick={handleFilterGroupButtonClick}
            />
            <SidebarHorizontalRule />
          </>
        )}
        {loading && (
          <>
            <FilterButtonGroupPlaceholder numberOfItems={5} />
            <SidebarHorizontalRule />
          </>
        )}
        {filters && !!filters.filter(i => i.published).length && (
          <>
            <FilterButtonGroup
              filters={filters.map(isFilterActiveMapper)}
              onFilterClick={handleFilterGroupButtonClick}
            />
            <SidebarHorizontalRule />
          </>
        )}
        {isTeam &&
          secondaryFilters &&
          !!secondaryFilters.filter(i => i.published).length && (
            <>
              <ImageButtonGrid
                viewable={
                  secondaryFilters.length < 9 ? secondaryFilters.length : 9
                }
              >
                {secondaryFilters
                  .map(isFilterActiveMapper)
                  .map((filter, index) => (
                    <ImageButton
                      key={index}
                      icon={filter.icon}
                      title={filter.name}
                      onClick={(e) => handleFilterGroupButtonClick(e, filter)}
                      active={filter.active}
                    />
                  ))}
              </ImageButtonGrid>
              <SidebarHorizontalRule />
            </>
          )}
        {!isTeam && (
          <>
            <SidebarButtonList title={<Heading level={3}>Sizes</Heading>}>
              <SizeButton title="Portrait" height={40} width={30} />
              <SizeButton title="Landscape" height={30} width={40} />
              <SizeButton title="Social" height={40} width={40} />
              <SizeButton title="Banner 2:1" height={20} width={40} />
              <SizeButton title="Pinterest 2:3" height={45} width={30} />
              <SizeButton title="Landscape 16:9" height={27} width={48} />
              <SizeButton title="Story 9:16" height={48} width={27} />
              <SizeButton title="Banner 3:1" height={15} width={45} />
              <SizeButton title="Banner 5:7" height={40} width={30} />
            </SidebarButtonList>
          </>
        )}
      </div>

      <div>
        <WidgetsBar
          widgets={widgets}
          onFilterClick={handleFilterClick}
          activeWidget={activeFilter}
          loading={loading}
        />
      </div>
    </StyledSidebar>
  );
};

export const team = () => {
  return <ExampleSidebar isTeam />;
};

export const website = () => {
  return <ExampleSidebar isTeam={false} />;
};

export const teamWebsite = () => {
  return <ExampleSidebar isTeam isWebsiteCatalog />;
};

export default {
  title: "Topics/Sidebar",
  includeStories: [],
  decorators: [withKnobs]
};
