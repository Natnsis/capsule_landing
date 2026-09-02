<script lang="ts">
	import { onMount } from 'svelte';

	const REPO = 'https://github.com/Natnsis/capsule';
	const RELEASES = REPO + '/releases/latest';
	const APK = REPO + '/releases/latest/download/capsule.apk';
	const SHA256 = '5f9107b3f01a6305735a93c6db32e50dfebd882ca242d42a186b0184ec1a8178';
	const YEAR = new Date().getFullYear();

	let copied = $state(false);
	async function copySha() {
		try {
			await navigator.clipboard.writeText(SHA256);
			copied = true;
			setTimeout(() => (copied = false), 1800);
		} catch {
			copied = false;
		}
	}

	onMount(() => {
		const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
		const show = (el: Element) => el.classList.add('in');
		if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
			els.forEach(show);
			return;
		}
		els.forEach((el) => el.classList.add('pre'));
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) {
						show(e.target);
						io.unobserve(e.target);
					}
				}
			},
			{ rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
		);
		els.forEach((el) => io.observe(el));
		// Safety net — never leave content hidden if the observer misfires.
		const t = setTimeout(() => els.forEach(show), 1200);
		return () => clearTimeout(t);
	});

	const features = [
		{
			k: 'calendar',
			title: 'Pick the open day',
			body: 'Choose any date in the future — a birthday, a New Year, ten years out. The countdown starts the moment you seal.'
		},
		{
			k: 'lock',
			title: 'Sealed means sealed',
			body: 'Once you lock a capsule, not even you can open it early. No preview, no export, no shortcuts.'
		},
		{
			k: 'fingerprint',
			title: 'Biometric seal',
			body: 'Lock a capsule to your fingerprint or face. Only the same you, on the same device, gets it back.'
		},
		{
			k: 'keypad',
			title: 'PIN on open',
			body: 'The app itself sits behind a 4-digit PIN, so a borrowed phone never means a read capsule.'
		},
		{
			k: 'note',
			title: 'Notes, photos & more',
			body: 'Write a rich-text letter and attach photos, audio or video — up to 25 MB per capsule. It is a message, not a hard drive.'
		},
		{
			k: 'bell',
			title: 'Open-day reminders',
			body: 'Capsule schedules a local notification for the exact day. It comes back to you right on time, even offline.'
		},
		{
			k: 'device',
			title: 'Yours only',
			body: 'Every capsule lives on your device in a local database. No account, no cloud, nothing leaves the phone.'
		},
		{
			k: 'moon',
			title: 'Light & dark',
			body: 'A calm lavender palette in the day, a deep plum one at night. The whole app repaints in a tap.'
		}
	];

	const steps = [
		{ n: '01', title: 'Write it', body: 'A note to whoever you become. Add the photos you want them to see.' },
		{ n: '02', title: 'Seal it', body: 'Pick the open day, lock it with your fingerprint, and let it go.' },
		{ n: '03', title: 'Meet it again', body: 'On the day, Capsule brings it back — the words, the pictures, the you from before.' }
	];
</script>

{#snippet icon(k: string)}
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		{#if k === 'calendar'}
			<rect x="3.5" y="5" width="17" height="16" rx="4" />
			<path d="M3.5 10h17M8 3.5v3M16 3.5v3" />
			<circle cx="12" cy="15" r="1.3" fill="currentColor" stroke="none" />
		{:else if k === 'lock'}
			<rect x="4" y="10" width="16" height="11" rx="5.5" />
			<path d="M8 10V7a4 4 0 0 1 8 0v3" />
			<circle cx="12" cy="14.5" r="1.1" fill="currentColor" stroke="none" />
			<path d="M12 15v2.5" />
		{:else if k === 'fingerprint'}
			<path d="M5 11a7 7 0 0 1 14 0" />
			<path d="M7.5 12.5a4.5 4.5 0 0 1 9 0c0 2.2-.4 4.2-1.2 6" />
			<path d="M12 12.5v3.5c0 1.6-.3 2.9-.9 4.2" />
			<path d="M9.4 20a10 10 0 0 0 1.1-4.8" />
		{:else if k === 'keypad'}
			<circle cx="7" cy="7" r="1.5" fill="currentColor" stroke="none" />
			<circle cx="12" cy="7" r="1.5" fill="currentColor" stroke="none" />
			<circle cx="17" cy="7" r="1.5" fill="currentColor" stroke="none" />
			<circle cx="7" cy="12" r="1.5" fill="currentColor" stroke="none" />
			<circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
			<circle cx="17" cy="12" r="1.5" fill="currentColor" stroke="none" />
			<path d="M8 17.5h8" />
		{:else if k === 'note'}
			<path d="M6 3.5h8.5L19 8v11.5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1Z" />
			<path d="M14 3.5V8h4.5M8.5 12.5h7M8.5 16h5" />
		{:else if k === 'bell'}
			<path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2.5h-15Z" />
			<path d="M10 19.5a2 2 0 0 0 4 0" />
		{:else if k === 'device'}
			<rect x="7" y="3" width="10" height="18" rx="3" />
			<path d="M11 18h2" />
		{:else if k === 'moon'}
			<path d="M19 13.5A7.5 7.5 0 0 1 10.5 5c0-.5 0-1 .2-1.5A8 8 0 1 0 20.5 13c-.5.2-1 .3-1.5.5Z" />
		{/if}
	</svg>
{/snippet}

<div class="page">
	<div class="wash" aria-hidden="true">
		<span class="blob blob-a"></span>
		<span class="blob blob-b"></span>
		<span class="blob blob-c"></span>
	</div>

	<header class="nav">
		<a class="brand" href="#top" aria-label="Capsule home">
			<img class="brand-mark" src="/imgs/icon.png" alt="" width="34" height="34" />
			<span>Capsule</span>
		</a>
		<nav class="nav-links">
			<a href="#features">Features</a>
			<a href="#how">How it works</a>
			<a href={REPO}>GitHub</a>
			<a class="pill pill-solid pill-sm" href="#download">Download</a>
		</nav>
	</header>

	<main id="top">
		<section class="hero">
			<div class="hero-copy">
				<span class="eyebrow">A private time capsule for your phone</span>
				<h1>Say it now.<br />Read it later.</h1>
				<p class="lede">
					Write a note, add photos, pick the day it opens — a message to whoever you become.
					Once you seal a capsule, not even you can open it early.
				</p>
				<div class="cta-row">
					<a class="pill pill-solid" href={APK}>
						{@render icon('device')}
						Download for Android
					</a>
					<a class="pill pill-ghost" href={RELEASES}>View all releases</a>
				</div>
				<div class="meta-row">
					<span class="tag">APK · Android 8.0+</span>
					<span class="tag tag-quiet">Desktop builds from source</span>
				</div>
			</div>

			<div class="hero-art reveal">
				<div class="phone">
					<div class="phone-screen">
						<div class="ob-wash"></div>
						<img class="ob-photo" src="/imgs/onboarding3.jpg" alt="Capsule onboarding artwork" />
						<div class="ob-dots"><i class="on"></i><i></i><i></i></div>
						<h3 class="ob-title">Future you is listening.</h3>
						<p class="ob-body">Choose the open day and let it go. Capsule brings it back right on time.</p>
						<div class="ob-btn">Get started</div>
					</div>
				</div>
				<div class="art-card art-card-a">
					<span class="ac-icon">{@render icon('lock')}</span>
					<div>
						<strong>To me, at 25</strong>
						<span>Sealed for 2 years, 3 days</span>
					</div>
				</div>
				<div class="art-card art-card-b">
					<span class="ac-icon ac-green">{@render icon('bell')}</span>
					<div>
						<strong>Opens today</strong>
						<span>1 January · 09:00</span>
					</div>
				</div>
			</div>
		</section>

		<section class="creed reveal">
			<p class="creed-lead">Sealed means sealed.</p>
			<div class="creed-items">
				<span>No preview</span>
				<span class="dot"></span>
				<span>No export</span>
				<span class="dot"></span>
				<span>No shortcuts</span>
			</div>
			<p class="creed-note">
				A capsule you can peek at is just a note. Capsule removes the option — from everyone, including you.
			</p>
		</section>

		<section id="features" class="features">
			<div class="section-head reveal">
				<span class="eyebrow">What's inside</span>
				<h2>Small app. One serious promise.</h2>
				<p>Everything Capsule does is in service of a message arriving intact, on the day you chose.</p>
			</div>
			<div class="grid">
				{#each features as f, i}
					<article class="card reveal" style="--d:{(i % 2) * 60}ms">
						<span class="card-icon">{@render icon(f.k)}</span>
						<h3>{f.title}</h3>
						<p>{f.body}</p>
					</article>
				{/each}
			</div>
		</section>

		<section id="how" class="how">
			<div class="section-head reveal">
				<span class="eyebrow">Three steps</span>
				<h2>Write it, seal it, meet it again.</h2>
			</div>
			<ol class="steps">
				{#each steps as s}
					<li class="step reveal">
						<span class="step-n">{s.n}</span>
						<h3>{s.title}</h3>
						<p>{s.body}</p>
					</li>
				{/each}
			</ol>
		</section>

		<section id="download" class="download">
			<div class="dl-card reveal">
				<span class="blob dl-blob" aria-hidden="true"></span>
				<div class="dl-inner">
					<span class="eyebrow">Get Capsule</span>
					<h2>Free, open source, and yours.</h2>
					<p>
						Grab the latest Android build below. Linux, macOS and Windows builds can be compiled
						from the same Flutter source.
					</p>
					<div class="cta-row">
						<a class="pill pill-solid" href={APK}>
							{@render icon('device')}
							Download APK
						</a>
						<a class="pill pill-ghost" href={REPO}>Build from source</a>
					</div>

					<div class="checksum">
						<div class="cs-head">
							<span>SHA-256 · release APK</span>
							<button type="button" onclick={copySha}>{copied ? 'Copied' : 'Copy'}</button>
						</div>
						<code>{SHA256}</code>
						<p class="cs-verify">
							Verify after download: <span>sha256sum capsule.apk</span>
						</p>
					</div>
				</div>
			</div>
		</section>
	</main>

	<footer class="foot">
		<div class="foot-brand">
			<img src="/imgs/icon.png" alt="" width="28" height="28" />
			<span>Capsule</span>
		</div>
		<div class="foot-links">
			<a href={REPO}>GitHub</a>
			<a href={RELEASES}>Releases</a>
			<a href={REPO + '/issues'}>Report an issue</a>
		</div>
		<p class="foot-fine">Built with Flutter · Runs fully on-device · © {YEAR}</p>
	</footer>
</div>

<style>
	.page {
		position: relative;
		overflow: clip;
		background:
			linear-gradient(180deg, var(--bg-top) 0%, var(--bg-mid) 55%, var(--bg-bottom) 100%);
		min-height: 100vh;
	}

	.wash {
		position: absolute;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
		z-index: 0;
	}
	.blob {
		position: absolute;
		border-radius: 50%;
		filter: blur(70px);
		opacity: 0.55;
	}
	.blob-a {
		width: 620px;
		height: 620px;
		top: -220px;
		right: -160px;
		background: radial-gradient(circle at 35% 35%, var(--blob-pink), transparent 70%);
	}
	.blob-b {
		width: 560px;
		height: 560px;
		top: 380px;
		left: -220px;
		background: radial-gradient(circle at 40% 40%, var(--blob-mid), transparent 70%);
	}
	.blob-c {
		width: 500px;
		height: 500px;
		bottom: -180px;
		right: -120px;
		background: radial-gradient(circle at 50% 50%, var(--card-2), transparent 70%);
		opacity: 0.4;
	}

	.nav,
	main,
	.foot {
		position: relative;
		z-index: 1;
	}

	/* ---------- nav ---------- */
	.nav {
		max-width: 1140px;
		margin: 0 auto;
		padding: 26px 24px 8px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
	}
	.brand {
		display: flex;
		align-items: center;
		gap: 10px;
		font-weight: 800;
		font-size: 1.15rem;
		letter-spacing: -0.02em;
		text-decoration: none;
	}
	.brand-mark {
		border-radius: 10px;
		border: 1px solid var(--glass-line);
	}
	.nav-links {
		display: flex;
		align-items: center;
		gap: 26px;
		font-size: 0.94rem;
		font-weight: 600;
	}
	.nav-links a {
		text-decoration: none;
		color: var(--muted);
		transition: color 0.15s ease;
	}
	.nav-links a:hover {
		color: var(--ink);
	}
	.nav-links .pill-sm {
		color: var(--on-fill);
	}

	/* ---------- pills / buttons ---------- */
	.pill {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 9px;
		height: 58px;
		padding: 0 28px;
		border-radius: 31px;
		font-weight: 700;
		font-size: 1rem;
		text-decoration: none;
		border: 1px solid transparent;
		white-space: nowrap;
		transition:
			transform 0.16s ease,
			box-shadow 0.16s ease,
			background 0.16s ease;
	}
	.pill :global(svg) {
		width: 19px;
		height: 19px;
	}
	.pill-solid {
		background: var(--fill);
		color: var(--on-fill);
		box-shadow: var(--card-shadow-sm);
	}
	.pill-solid:hover {
		transform: translateY(-2px);
		box-shadow: 0 26px 50px -18px rgba(50, 30, 80, 0.55);
	}
	.pill-ghost {
		background: var(--glass);
		color: var(--ink);
		border-color: var(--glass-line);
		backdrop-filter: blur(8px);
	}
	.pill-ghost:hover {
		transform: translateY(-2px);
	}
	.pill-sm {
		height: 40px;
		padding: 0 20px;
		font-size: 0.9rem;
		border-radius: 20px;
		box-shadow: none;
	}

	/* ---------- shared type ---------- */
	.eyebrow {
		display: inline-block;
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--muted-2);
	}
	h1 {
		margin: 18px 0 0;
		font-size: clamp(2.9rem, 7vw, 4.5rem);
		font-weight: 800;
		line-height: 1.03;
		letter-spacing: -0.038em;
		color: var(--ink);
	}
	h2 {
		margin: 14px 0 0;
		font-size: clamp(1.9rem, 3.6vw, 2.7rem);
		font-weight: 800;
		line-height: 1.1;
		letter-spacing: -0.03em;
		color: var(--ink);
	}

	/* ---------- hero ---------- */
	.hero {
		max-width: 1140px;
		margin: 0 auto;
		padding: clamp(36px, 6vw, 80px) 24px clamp(40px, 6vw, 72px);
		display: grid;
		grid-template-columns: 1.05fr 0.95fr;
		gap: clamp(28px, 5vw, 64px);
		align-items: center;
	}
	.lede {
		margin: 20px 0 0;
		max-width: 30rem;
		font-size: 1.12rem;
		line-height: 1.62;
		color: var(--body-ink);
	}
	.cta-row {
		display: flex;
		flex-wrap: wrap;
		gap: 14px;
		margin-top: 30px;
	}
	.meta-row {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-top: 18px;
	}
	.tag {
		font-size: 0.82rem;
		font-weight: 600;
		color: var(--muted);
		background: var(--glass-soft);
		border: 1px solid var(--glass-line);
		padding: 6px 12px;
		border-radius: 999px;
	}
	.tag-quiet {
		background: transparent;
		border-style: dashed;
		border-color: var(--faint);
	}

	/* ---------- hero art / phone ---------- */
	.hero-art {
		position: relative;
		justify-self: center;
		width: min(300px, 80vw);
	}
	.phone {
		position: relative;
		border-radius: 46px;
		padding: 12px;
		background: linear-gradient(160deg, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0.12));
		border: 1px solid var(--glass-line);
		box-shadow: var(--card-shadow);
	}
	.phone-screen {
		position: relative;
		border-radius: 36px;
		overflow: hidden;
		padding: 26px 22px 22px;
		min-height: 560px;
		display: flex;
		flex-direction: column;
		background: linear-gradient(180deg, var(--bg-top), var(--bg-bottom));
	}
	.ob-wash {
		position: absolute;
		inset: 0;
		background: radial-gradient(120% 60% at 20% 0%, var(--blob-pink), transparent 60%);
		opacity: 0.6;
	}
	.ob-photo {
		position: relative;
		width: 100%;
		height: 300px;
		object-fit: cover;
		border-radius: 26px;
	}
	.ob-dots {
		position: relative;
		display: flex;
		gap: 7px;
		margin: 22px 0 16px;
	}
	.ob-dots i {
		width: 7px;
		height: 7px;
		border-radius: 4px;
		background: rgba(20, 16, 25, 0.22);
	}
	.ob-dots i.on {
		width: 26px;
		background: var(--ink);
	}
	.ob-title {
		position: relative;
		margin: 0;
		font-size: 1.75rem;
		font-weight: 800;
		letter-spacing: -0.035em;
		line-height: 1.05;
		color: var(--ink);
	}
	.ob-body {
		position: relative;
		margin: 10px 0 0;
		font-size: 0.92rem;
		line-height: 1.55;
		color: var(--body-ink);
	}
	.ob-btn {
		position: relative;
		margin-top: auto;
		height: 52px;
		border-radius: 26px;
		background: var(--fill);
		color: var(--on-fill);
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
	}

	.art-card {
		position: absolute;
		display: flex;
		align-items: center;
		gap: 11px;
		padding: 12px 15px;
		border-radius: 20px;
		background: var(--glass);
		border: 1px solid var(--glass-line);
		backdrop-filter: blur(12px);
		box-shadow: var(--card-shadow-sm);
	}
	.art-card strong {
		display: block;
		font-size: 0.86rem;
		font-weight: 700;
		color: var(--ink);
	}
	.art-card span {
		font-size: 0.76rem;
		color: var(--muted);
	}
	.ac-icon {
		display: grid;
		place-items: center;
		width: 34px;
		height: 34px;
		border-radius: 12px;
		background: var(--lav-1);
		color: var(--plum);
		flex-shrink: 0;
	}
	.ac-icon :global(svg) {
		width: 18px;
		height: 18px;
	}
	.ac-green {
		background: var(--green-bg);
		color: var(--green-ink);
	}
	.art-card-a {
		top: 38px;
		left: -38px;
	}
	.art-card-b {
		bottom: -18px;
		right: -34px;
	}

	/* ---------- creed ---------- */
	.creed {
		max-width: 760px;
		margin: clamp(20px, 5vw, 48px) auto;
		padding: clamp(30px, 5vw, 46px) 28px;
		text-align: center;
		background: var(--glass);
		border: 1px solid var(--glass-line);
		border-radius: 34px;
		backdrop-filter: blur(10px);
	}
	.creed-lead {
		margin: 0;
		font-size: clamp(1.5rem, 3vw, 2rem);
		font-weight: 800;
		letter-spacing: -0.03em;
		color: var(--ink);
	}
	.creed-items {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		gap: 14px;
		margin: 16px 0 0;
		font-weight: 700;
		color: var(--plum);
	}
	.creed-items .dot {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: var(--faint);
	}
	.creed-note {
		margin: 14px auto 0;
		max-width: 34rem;
		font-size: 0.98rem;
		line-height: 1.6;
		color: var(--body-ink);
	}

	/* ---------- features ---------- */
	.features,
	.how,
	.download {
		max-width: 1140px;
		margin: 0 auto;
		padding: clamp(48px, 8vw, 90px) 24px;
	}
	.section-head {
		max-width: 34rem;
	}
	.section-head p {
		margin: 14px 0 0;
		font-size: 1.05rem;
		line-height: 1.6;
		color: var(--body-ink);
	}
	.grid {
		margin-top: 40px;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 16px;
	}
	.card {
		padding: 24px 22px 26px;
		border-radius: 24px;
		background: var(--glass);
		border: 1px solid var(--glass-line);
		backdrop-filter: blur(8px);
		transition:
			transform 0.18s ease,
			box-shadow 0.18s ease;
	}
	.card:hover {
		transform: translateY(-4px);
		box-shadow: var(--card-shadow-sm);
	}
	.card-icon {
		display: grid;
		place-items: center;
		width: 46px;
		height: 46px;
		border-radius: 16px;
		background: var(--lav-1);
		color: var(--plum);
	}
	.card-icon :global(svg) {
		width: 23px;
		height: 23px;
	}
	.card h3 {
		margin: 16px 0 0;
		font-size: 1.08rem;
		font-weight: 700;
		letter-spacing: -0.02em;
		color: var(--ink);
	}
	.card p {
		margin: 8px 0 0;
		font-size: 0.92rem;
		line-height: 1.58;
		color: var(--body-ink);
	}

	/* ---------- how ---------- */
	.steps {
		list-style: none;
		margin: 40px 0 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16px;
		counter-reset: step;
	}
	.step {
		padding: 28px 24px 30px;
		border-radius: 24px;
		background: linear-gradient(165deg, var(--card-1), var(--card-3));
		border: 1px solid var(--glass-line);
	}
	.step-n {
		font-size: 0.9rem;
		font-weight: 800;
		letter-spacing: 0.1em;
		color: var(--blob-deep);
	}
	.step h3 {
		margin: 12px 0 0;
		font-size: 1.25rem;
		font-weight: 800;
		letter-spacing: -0.02em;
		color: var(--ink-2);
	}
	.step p {
		margin: 8px 0 0;
		font-size: 0.94rem;
		line-height: 1.55;
		color: var(--plum);
	}

	/* ---------- download ---------- */
	.dl-card {
		position: relative;
		overflow: hidden;
		border-radius: 36px;
		background: linear-gradient(160deg, var(--card-1), var(--card-3));
		border: 1px solid var(--glass-line);
		box-shadow: var(--card-shadow);
	}
	.dl-blob {
		position: absolute;
		right: -80px;
		bottom: -110px;
		width: 300px;
		height: 300px;
		filter: blur(60px);
		opacity: 0.8;
		background: radial-gradient(circle at 40% 40%, #f6dce2, #7e4fae 75%);
	}
	.dl-inner {
		position: relative;
		padding: clamp(34px, 6vw, 60px);
		max-width: 40rem;
	}
	.dl-inner p {
		margin: 14px 0 0;
		font-size: 1.05rem;
		line-height: 1.6;
		color: var(--plum);
	}
	.dl-inner .eyebrow {
		color: var(--blob-deep);
	}
	.dl-inner h2 {
		color: var(--ink-2);
	}

	.checksum {
		margin-top: 30px;
		padding: 18px 18px 16px;
		border-radius: 20px;
		background: var(--glass);
		border: 1px solid var(--glass-line);
		backdrop-filter: blur(6px);
	}
	.cs-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--muted-2);
	}
	.cs-head button {
		font: inherit;
		font-size: 0.72rem;
		font-weight: 800;
		letter-spacing: 0.04em;
		cursor: pointer;
		border: 1px solid var(--glass-line);
		background: var(--glass-soft);
		color: var(--ink);
		padding: 5px 12px;
		border-radius: 999px;
		transition: background 0.15s ease;
	}
	.cs-head button:hover {
		background: var(--lav-1);
	}
	.checksum code {
		display: block;
		margin-top: 10px;
		font-family: ui-monospace, 'SF Mono', 'Cascadia Code', Menlo, Consolas, monospace;
		font-size: 0.82rem;
		line-height: 1.5;
		word-break: break-all;
		color: var(--ink);
	}
	.cs-verify {
		margin: 12px 0 0;
		font-size: 0.82rem;
		color: var(--plum);
	}
	.cs-verify span {
		font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
		background: var(--glass-soft);
		padding: 2px 7px;
		border-radius: 6px;
		border: 1px solid var(--glass-line);
	}

	/* ---------- footer ---------- */
	.foot {
		max-width: 1140px;
		margin: 0 auto;
		padding: 40px 24px 56px;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 16px 32px;
		border-top: 1px solid var(--divider);
	}
	.foot-brand {
		display: flex;
		align-items: center;
		gap: 9px;
		font-weight: 800;
		letter-spacing: -0.02em;
	}
	.foot-brand img {
		border-radius: 8px;
	}
	.foot-links {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
		font-size: 0.9rem;
		font-weight: 600;
	}
	.foot-links a {
		text-decoration: none;
		color: var(--muted);
	}
	.foot-links a:hover {
		color: var(--ink);
	}
	.foot-fine {
		margin: 0;
		flex-basis: 100%;
		font-size: 0.82rem;
		color: var(--muted-2);
	}

	/* ---------- reveal ---------- */
	.reveal:global(.pre) {
		opacity: 0;
		transform: translateY(18px);
	}
	.reveal:global(.in) {
		opacity: 1;
		transform: none;
		transition:
			opacity 0.6s ease,
			transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
		transition-delay: var(--d, 0ms);
	}

	/* ---------- responsive ---------- */
	@media (max-width: 940px) {
		.hero {
			grid-template-columns: 1fr;
			text-align: center;
		}
		.hero-copy .eyebrow {
			margin-inline: auto;
		}
		.lede {
			margin-inline: auto;
		}
		.cta-row,
		.meta-row {
			justify-content: center;
		}
		.hero-art {
			margin-top: 24px;
		}
		.grid {
			grid-template-columns: repeat(2, 1fr);
		}
		.steps {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 620px) {
		.nav-links a:not(.pill) {
			display: none;
		}
		.grid {
			grid-template-columns: 1fr;
		}
		.art-card-a {
			left: -6px;
		}
		.art-card-b {
			right: -6px;
		}
		.pill {
			width: 100%;
		}
	}
</style>
