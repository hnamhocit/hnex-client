import styled from 'styled-components'

const Spinner = styled.div`
	width: 80px;
	aspect-ratio: 1;
	--c: no-repeat radial-gradient(farthest-side, #fff 92%, #0000);
	background: var(--c) 50% 0, var(--c) 50% 100%, var(--c) 100% 50%,
		var(--c) 0 50%;
	background-size: 16px 16px;
	animation: l18 1s infinite;
	position: relative;

	&::before {
		content: '';
		position: absolute;
		inset: 0;
		margin: 3px;
		background: repeating-conic-gradient(#0000 0 35deg, #fff 0 90deg);
		-webkit-mask: radial-gradient(
			farthest-side,
			#0000 calc(100% - 3px),
			#000 0
		);
		border-radius: 50%;
	}

	@keyframes l18 {
		100% {
			transform: rotate(0.5turn);
		}
	}
`

export default Spinner
