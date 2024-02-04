import { Canvas, Edge, MarkerArrow, Node } from 'reaflow';
import Schema from './Schema';
import styles from './schema.module.css';

const TreeGrapht = ({ nodeList, edgesList }: any) => {
  return (
    <>
      {!!nodeList?.length && (
        <div>
          <Canvas
            className="dbn-w-full"
            height={500}
            fit
            pannable={false}
            readonly
            direction="RIGHT"
            disabled
            nodes={nodeList}
            edges={edgesList}
            layoutOptions={{
              'elk.hierarchyHandling': 'INCLUDE_CHILDREN', // this is necessary to have edges from and to nested nodes. (see https://github.com/reaviz/reaflow/blob/3e097f54e349d7f729c62757c6715155ef3e3e2e/stories/Nested.stories.tsx#L240 )
            }}
            arrow={<MarkerArrow style={{ fill: '#C0CCF5' }} />}
            edge={<Edge style={{ stroke: '#C0CCF5' }} />}
            node={
              <Node
                style={{
                  fill: 'white',
                  strokewidth: 0,
                  stroke: 'none',
                }}
              >
                {(event) => (
                  <foreignObject
                    height={event.height}
                    width={1.3 * event.width}
                    x={0}
                    y={0}
                    className={styles['schema-tree-container']}
                  >
                    <Schema data={event.node.data} />
                  </foreignObject>
                )}
              </Node>
            }
          />
        </div>
      )}
    </>
  );
};

export default TreeGrapht;
