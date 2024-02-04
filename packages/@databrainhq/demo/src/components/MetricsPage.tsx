// import {useState} from 'react';
// import {Metric, Ui} from '@databrainhq/plugin';

// function MetricsPage({token}: {token: string}) {
// 	const [metrics, setMetrics] = useState<
// 		{metricId: string; width?: number; height?: number}[]
// 	>([]);
// 	const [metricModal, setMetricModal] = useState<{
// 		isOpen: boolean;
// 		metricId: string;
// 		width?: number;
// 		height?: number;
// 	}>({
// 		isOpen: false,
// 		metricId: '',
// 	});
// 	return (
// 		<>
// 			<Ui.Button
// 				variant='primary'
// 				size='large'
// 				type='button'
// 				className='fixed right-5 top-2 z-[1000]'
// 				onClick={() => setMetricModal((prev) => ({...prev, isOpen: true}))}
// 			>
// 				Add Metric
// 			</Ui.Button>
// 			<div className='flex w-full h-full flex-wrap gap-2 p-5 mt-10'>
// 				{metrics.map((metric, index) => (
// 					<Metric
// 						token={token}
// 						metricId={metric.metricId}
// 						key={metric.metricId + index}
// 						height={metric.height}
// 						width={metric.width}
// 					/>
// 				))}
// 			</div>
// 			<Ui.Modal
// 				isOpen={metricModal.isOpen}
// 				onClose={() =>
// 					setMetricModal({
// 						isOpen: false,
// 						metricId: '',
// 					})
// 				}
// 				headerTitle='Add Metric'
// 			>
// 				<div className='w-[400px] p-5 flex flex-col gap-[22px]'>
// 					<Ui.InputField
// 						type='text'
// 						name='metricId'
// 						placeholder='e.g. total-sales'
// 						label='Metric Id'
// 						value={metricModal.metricId}
// 						onChange={(e) =>
// 							setMetricModal((prev) => ({...prev, metricId: e.target.value}))
// 						}
// 					/>
// 					<Ui.InputField
// 						type='number'
// 						name='width'
// 						min={0}
// 						placeholder='e.g. 300'
// 						label='Metric Card Width'
// 						value={metricModal.width}
// 						onChange={(e) =>
// 							setMetricModal((prev) => ({
// 								...prev,
// 								width: Number(e.target.value),
// 							}))
// 						}
// 					/>
// 					<Ui.InputField
// 						type='number'
// 						name='height'
// 						min={0}
// 						placeholder='e.g. 200'
// 						label='Metric Card Height'
// 						value={metricModal.height}
// 						onChange={(e) =>
// 							setMetricModal((prev) => ({
// 								...prev,
// 								height: Number(e.target.value),
// 							}))
// 						}
// 					/>
// 				</div>
// 				<Ui.ModalFooter>
// 					<Ui.Button
// 						type='button'
// 						variant='secondary'
// 						className='text-center bg-gay-200'
// 						size='default'
// 						onClick={() =>
// 							setMetricModal({
// 								isOpen: false,
// 								metricId: '',
// 							})
// 						}
// 					>
// 						Cancel
// 					</Ui.Button>
// 					<Ui.Button
// 						type='button'
// 						variant='primary'
// 						size='default'
// 						onClick={() => {
// 							setMetrics((prev) => [
// 								...prev,
// 								{
// 									metricId: metricModal.metricId,
// 									width: metricModal.width,
// 									height: metricModal.height,
// 								},
// 							]);
// 							setMetricModal({
// 								isOpen: false,
// 								metricId: '',
// 							});
// 						}}
// 					>
// 						Save
// 					</Ui.Button>
// 				</Ui.ModalFooter>
// 			</Ui.Modal>
// 		</>
// 	);
// }

// export default MetricsPage;

export {};