# Tik Tak Admin — Kodun Tam İzahı (0-dan 100-ə)

Bu sənəd, layihədəki **hər bir faylı sətir-sətir** izah edir. Heç bir proqramlaşdırma təcrübəsi olmayan biri (kursa yeni başlayan səviyyəsi) belə, bu sənədi oxuyub layihənin necə işlədiyini başa düşə bilməlidir.

**Bu layihə TypeScript-dədir** (adi JavaScript deyil) — bu, hər faylın sonunda `.js`/`.jsx` yox, `.ts`/`.tsx` olması deməkdir. TypeScript nədir, niyə var, necə oxunur — bunların hamısı aşağıda, xüsusi bir bölmədə, ADDIM-ADDIM, çox sadə dildə izah olunub. Qorxmayın — TypeScript, JavaScript-in ÜZƏRİNƏ, sadəcə "bu dəyər hansı NÖV-dədir" məlumatını əlavə edən bir təbəqədir, əsas məntiq (funksiyalar, komponentlər) tamamilə eynidir.

**Necə oxumaq lazımdır:** Əvvəlcə "Hissə 1", "Hissə 2" və "Hissə 3"-ü oxuyun (bunlar bütün kodda təkrar-təkrar rast gələcəyiniz JavaScript/React VƏ TypeScript sintaksisini izah edir — Hissə 3 məhz TypeScript üçündür və ƏN ƏTRAFLI bölmədir). Sonra istənilən sırayla, istədiyiniz faylın izahına keçə bilərsiniz — hər bölmə özbaşınadır.

---

## Mündəricat

1. [Bu layihə nədir və nə üçün belə qurulub](#hissə-1-bu-layihə-nədir)
2. [JavaScript/React sintaksis lüğəti — əvvəlcə bunu oxuyun](#hissə-2-sintaksis-lüğəti)
3. [TypeScript sintaksis lüğəti — bunu da mütləq oxuyun](#hissə-3-typescript-lüğəti)
4. [Qovluq strukturu — hər qovluq nə üçündür](#hissə-4-qovluq-strukturu)
5. [`src/types/` qovluğu — bütün tip faylları](#hissə-5-types-qovluğu)
6. [Giriş nöqtəsi: `main.tsx` və `App.tsx`](#hissə-6-giriş-nöqtəsi)
7. [Marşrutlaşdırma (Routing): `AppRoutes.tsx`, `RequireAuth.tsx`, `RedirectIfAuth.tsx`](#hissə-7-routing)
8. [Autentifikasiya (Auth): `session.ts`, `useAuthStore.ts`, `authService.ts`](#hissə-8-auth)
9. [API qatı: `axiosInstance.ts` və servis faylları](#hissə-9-api-qatı)
10. [Adapterlər: API formatını UI formatına çevirmək](#hissə-10-adapterlər)
11. [Sabitlər (Constants): `productTypes.ts`, `orderStatus.ts`](#hissə-11-sabitlər)
12. [`formatDate.ts`](#hissə-12-formatdate)
13. [TanStack Query qatı: `queryClient.ts`](#hissə-13-tanstack-query)
14. [Ortaq (shared) komponentlər](#hissə-14-shared-komponentlər)
15. [Öz hook-larımız (custom hooks)](#hissə-15-custom-hooks)
16. [`Pagination.tsx`](#hissə-16-pagination)
17. [Layout: `AdminLayout.tsx`, `Sidebar.tsx`, `Header.tsx`](#hissə-17-layout)
18. [Səhifələr: Login, NotFound, Categories, Campaigns, Products, Orders, Users](#hissə-18-səhifələr)
19. [CSS Modules necə işləyir](#hissə-19-css-modules)
20. [Tooling: `tsconfig.json`, `.oxlintrc.json`, `vite-env.d.ts`](#hissə-20-tooling)
21. [Lüğət — tez-tez rast gələcəyiniz sözlər](#hissə-21-lüğət)

---

## Hissə 1: Bu layihə nədir

Bu, **Tik Tak** adlı bir e-ticarət saytının **admin panelidir** — yəni mağazanın işçilərinin sifarişlərə, məhsullara, kateqoriyalara, kampaniyalara və istifadəçilərə baxıb idarə etdiyi daxili veb-tətbiqdir. Müştərilərin özlərinin gördüyü sayt deyil, "arxa ofis" hissəsidir.

Texnologiyalar:
- **React** — istifadəçi interfeysini (UI) qurmaq üçün JavaScript kitabxanası. "Komponent" adlanan kiçik hissələrdən (düymə, cədvəl, forma) böyük səhifələr qururuq.
- **TypeScript** — JavaScript-in ÜZƏRİNƏ "tip" (data növü) yoxlaması ƏLAVƏ EDƏN bir dil. Kodu YAZARKƏN (hələ işə salmadan) səhvləri (məs. "bu funksiyaya rəqəm əvəzinə mətn verilib" kimi) tapmağa kömək edir. Aşağıda Hissə 3-də ətraflı izah olunur.
- **Vite** — layihəni sürətlə işə salan və "build" (yəni brauzerin başa düşəcəyi fayllara çevirən) alət.
- **react-router-dom** — brauzerdə ünvan çubuğundakı yol (`/sifarisler`, `/kateqoriyalar` və s.) dəyişəndə hansı komponentin göstəriləcəyini idarə edir.
- **axios** — backend (server) ilə HTTP sorğuları (GET, POST, PUT, DELETE) göndərmək üçün kitabxana.
- **@tanstack/react-query** — serverdən gələn datanı (kateqoriyalar siyahısı, sifarişlər və s.) yükləmək, yaddaşda saxlamaq (cache) və yeniləmək üçün kitabxana.
- **@tanstack/react-table** — CƏMİ BİR YERDƏ, `Orders` SƏHİFƏSİNDƏ, İSTİFADƏ OLUNUR: SÜTUN BAŞLIQLARINDA SIRALAMA + FİLTRASİYA MƏNTİQİNİ (HANSI SƏTİR HANSI ŞƏRTƏ UYĞUNDUR, HANSI SIRAYLA GÖSTƏRİLİR) ÖZ ƏLİMİZLƏ YAZMAQ ƏVƏZİNƏ, HAZIR (VƏ SINANMIŞ) BİR KİTABXANAYA HAVALƏ EDİR — Hissə 18-Ə BAXIN.
- **@radix-ui/react-dropdown-menu** — ƏLÇATANLIQ (accessibility) QAYDALARINA (KLAVİATURA İLƏ İDARƏ, FOKUS TƏLƏLƏRİ VƏ S.) ÖZÜMÜZ RİAYƏT ETMƏK ƏVƏZİNƏ HAZIR GƏLƏN, "STİLSİZ" (unstyled) DROPDOWN KOMPONENTLƏRİ — YALNIZ `Orders`-İN SÜTUN FİLTR MENYUSUNDA (`ColumnHeader.tsx`) İSTİFADƏ OLUNUR.
- **react-hook-form** — FORMALARIN (`CategoryForm`, `ProductForm`, `CampaignForm`) STATE-İNİ (HƏR SAHƏNİN CARİ DƏYƏRİ, HANSI SAHƏ "TOXUNULUB" VƏ S.) ƏL İLƏ `useState`+`onChange` İLƏ İDARƏ ETMƏK ƏVƏZİNƏ İDARƏ EDƏN KİTABXANA — Hissə 18-Ə BAXIN.
- **date-fns** (`date-fns/locale`-DƏN `az`) VƏ **react-day-picker** — YALNIZ `Orders`-İN TARİX FİLTRİNDƏ, TƏQVİM AÇILAN PƏNCƏRƏSİ (`DateFilterCalendar.tsx`) ÜÇÜN — AZƏRBAYCAN DİLİ TƏQVİM ETİKETLƏRİ (AY/GÜN ADLARI) `date-fns`-İN `az` LOKALİNDƏN GƏLİR.
- **zustand** — komponentlər arasında paylaşılan sadə "qlobal state" üçün (İKİ AYRI STORE: `useAuthStore` — LOGIN MƏLUMATI, VƏ `useThemeStore` — İŞIQLI/QARANLIQ REJİM, Hissə 17-YƏ BAXIN).
- **sonner** — ekranın küncündə çıxan bildiriş qutucuqları (toast) üçün kitabxana.
- **lucide-react** — bütün ikonların (zəng, göz, qələm və s.) gəldiyi kitabxana.
- **CSS Modules** — hər komponentin öz CSS faylı olur və klaslar avtomatik unikal edilir ki, bir komponentin stili başqasına təsir etməsin.
- **oxlint** — kodu YAZARKƏN "bu səhvdir" deyə xəbərdarlıq edən alət (linter). ESLint-in daha sürətli bir alternativi, TypeScript-i də başa düşür.

**Qısaca "niyə TypeScript?"** Adi JavaScript-də, məsələn bir funksiyaya səhvən massiv əvəzinə obyekt versəniz, bunu YALNIZ proqramı İŞƏ SALIB, o hissəyə GƏLƏNDƏ (bəzən istifadəçinin kompüterində!) bir XƏTA kimi görürsünüz. TypeScript isə bunu SİZ KODU YAZARKƏN, REDAKTORDA QIRMIZI XƏTT ÇƏKƏRƏK dərhal göstərir — səhv İSTİFADƏÇİYƏ ÇATMAZDAN ƏVVƏL tutulur.

---

## Hissə 2: Sintaksis lüğəti

Kodun içində dəfələrlə görəcəyiniz "qəliz görünən" simvolları burda sadələşdirib izah edirik. Bunları bir dəfə anlasanız, aşağıdakı bütün fayllar çox rahat oxunacaq. (Bu bölmə TypeScript-ə aid DEYİL — sadəcə JavaScript/React. TypeScript-in ÖZ sintaksisi üçün Hissə 3-ə keçin.)

### `import` / `export` — fayllar arası əlaqə

```ts
import { useState } from 'react'      // "react" paketindən useState adlı şeyi gətir
import Button from '@/shared/components/Button'  // Button qovluğunun index.ts-indən "default export"-u gətir
export default function App() { ... } // bu faylın ƏSAS (default) ixracı
export const foo = () => {}           // bu faylın ADI ilə ixrac olunan şeyi (bir fayldan bir neçə belə ola bilər)
```
- `export default` — hər faylda **yalnız bir dənə** ola bilər, import edərkən istənilən adla çağıra bilərsiniz.
- `export const X` (adlı/named export) — bir fayldan bir neçə ola bilər, import edərkən **dəqiq həmin adla**, fiqurlu mötərizədə gətirilməlidir: `import { X } from '...'`.
- `@/` — bu layihədə "qısayoldur", `src/` qovluğuna işarə edir (`tsconfig.json`-da təyin olunub). Yəni `@/shared/components/Button` = `src/shared/components/Button/` qovluğu — daha dəqiq desək, o qovluğun İÇİNDƏKİ `index.ts` faylı (BU, HAZIRKI LAYİHƏNİN QAYDASIDIR: HƏR KOMPONENT/SƏHİFƏ/UTIL QOVLUĞUNUN ÖZ `index.ts`-i VAR, İDXAL EDƏNDƏ FAYLIN ÖZ ADINI (`Button/Button`) YOX, YALNIZ QOVLUĞU (`Button`) YAZIRSINIZ — Hissə 4-DƏ ƏTRAFLI İZAH OLUNUR).

### Dəyişən elan etmək: `const` və `let`

```ts
const x = 5   // x-ə BİR DƏFƏ dəyər verilir, sonra dəyişdirilə bilməz
let y = 5     // y-ə sonra yenidən dəyər verilə bilər (y = 10)
```
Bu kodda demək olar həmişə `const` görəcəksiniz — funksiyalar da, obyektlər də adətən `const`-a yazılır.

### Ox funksiyası (arrow function)

```ts
function topla(a, b) { return a + b }   // klassik funksiya
const topla = (a, b) => a + b           // eyni şey, "ox funksiyası" forması
const salamla = () => { console.log('salam') }  // parametr yoxdursa boş mötərizə
const kvadrat = (x) => x * x            // { return ... } yazmasan, avtomatik "return" olur
```
`(parametrlər) => nəticə` — bu, "bu parametrləri al, bu nəticəni qaytar" deməkdir. Kodun demək olar hər yerində, xüsusən `.map()`, `.filter()`, `onClick={() => ...}` daxilində istifadə olunur.

### Destructuring (obyektdən/massivdən "çıxarıb almaq")

```ts
const user = { name: 'Ali', age: 20 }
const { name, age } = user        // user.name-i `name`-ə, user.age-i `age`-ə çıxarır
const { name: adı } = user        // "name" sahəsini fərqli adla (adı) çıxarmaq

const arr = [1, 2, 3]
const [birinci, ikinci] = arr     // birinci=1, ikinci=2

function Button({ variant, children }) { ... }  // funksiyanın PARAMETRİ birbaşa destructure olunur —
                                                  // yəni <Button variant="solid">mətn</Button> çağırılanda
                                                  // props obyektindən variant və children avtomatik çıxarılır
```

### Spread (`...`) və Rest (`...`)

Eyni üç nöqtə, İKİ FƏRQLİ məna daşıyır, kontekstdən asılıdır:

```ts
// SPREAD — obyekti/massivi "açıb" başqasının içinə tökmək
const a = { x: 1, y: 2 }
const b = { ...a, z: 3 }          // b = { x: 1, y: 2, z: 3 } (a-nın BÜTÜN sahələrini kopyalayır)
const c = { ...a, x: 99 }         // c = { x: 99, y: 2 } (sonra yazılan sahə əvvəlkini "üstələyir")

const arr1 = [1, 2]
const arr2 = [...arr1, 3]         // arr2 = [1, 2, 3]

// REST — "qalanları" bir yerə yığmaq (adətən funksiya parametrində)
function Button({ variant, children, ...rest }) { ... }
// variant və children ayrıca çıxarılır, QALAN bütün prop-lar (onClick, disabled, type və s.)
// "rest" adlı BİR obyektə yığılır — sonra <button {...rest}> ilə hamısı birdən elementə verilir
```

### Template literal (backtick `` ` `` ilə string)

```ts
const ad = 'Əli'
const salam = `Salam, ${ad}!`     // "Salam, Əli!" — ${...} içinə DƏYİŞƏN yazmaq olar
const url = `/admin/categories/${id}`  // dinamik URL qurmaq üçün çox işlədilir
```
Adi `'...'` və ya `"..."` daxilində `${}` işləmir — yalnız backtick (`` ` ``) daxilində işləyir.

### Ternar operator (qısa if/else)

```ts
const mesaj = yaş >= 18 ? 'Böyüksən' : 'Kiçiksən'
// oxunuşu: "əgər (yaş >= 18) DOĞRUDURSA → 'Böyüksən', YOXSA → 'Kiçiksən'"

{loading ? 'Göndərilir...' : 'Yarat'}   // JSX daxilində şərtə görə mətn göstərmək
```

### `&&` ilə şərti göstərmək (JSX-də çox işlədilir)

```ts
{loading && <Loading />}
```
Bu, "əgər `loading` doğrudursa, `<Loading/>`-u göstər, yoxsa HEÇ NƏ göstərmə" deməkdir. JavaScript-də `&&` soldan sağa yoxlayır — sol tərəf `false` olsa, sağ tərəfə belə baxmır (React da o zaman heç nə render etmir).

### Optional chaining `?.` — "əgər varsa, daxil ol"

```ts
const ad = user?.profile?.name
// user undefined/null-dursa, XƏTA VERMƏDƏN sadəcə `undefined` qaytarır
// user varsa amma profile yoxdursa, yenə xəta vermir, undefined qaytarır
// YALNIZ user.profile.name-in HAMISI mövcud olanda əsl dəyəri qaytarır

item.category?.name ?? ''   // aşağıda izah olunan ?? ilə birlikdə tez-tez görəcəksiniz
```
Bunsuz, `user.profile.name` yazsaydınız və `user` `null`/`undefined` olsaydı, proqram **xəta ilə dayanardı** ("Cannot read property 'profile' of undefined"). `?.` bunun qarşısını alır.

### Nullish coalescing `??` — "yoxdursa, bunu istifadə et"

```ts
const say = itemCount ?? 0
// itemCount `null` və ya `undefined`-dursa → 0 istifadə olunur
// itemCount 0-dırsa (əsl rəqəm kimi) → 0 elə YENƏ 0 qalır (bu, || -dan FƏRQLİDİR!)
```
Diqqət: `??` yalnız `null`/`undefined` üçün işləyir. `||` isə `0`, `''`, `false` kimi bütün "falsy" dəyərləri də əvəz edir — bu kodda hər ikisi işlədilir, məqsədə görə seçilib (məs. `form.imageUrl || ''` — boş string istəyəndə `||` düzgündür).

### Massiv metodları: `.map()`, `.filter()`, `.find()`, `.slice()`, `.reduce()`

```ts
const nömrələr = [1, 2, 3]

nömrələr.map(n => n * 2)          // [2, 4, 6] — HƏR elementi çevirib YENİ massiv qaytarır
nömrələr.filter(n => n > 1)       // [2, 3] — şərtə uyan elementləri SEÇİB yeni massiv qaytarır
nömrələr.find(n => n === 2)       // 2 — şərtə uyan İLK elementi (təkcə birini) qaytarır, tapmasa `undefined`
nömrələr.slice(0, 2)              // [1, 2] — indeks 0-dan 2-yə QƏDƏR (2 daxil deyil) "kəsib" yeni massiv qaytarır
nömrələr.reduce((cəm, n) => cəm + n, 0)  // 6 — massivi TƏK bir dəyərə "yığır" (topla, say, qrupla və s.)
```
Bu layihədə `.map()` ən çox JSX daxilində siyahı göstərmək üçün işlədilir:
```tsx
{categories.map((item) => <tr key={item.id}>{item.name}</tr>)}
```
Hər `item` üçün bir `<tr>` yaradır. `key={item.id}` React-a "bu sətir hansı data ilə bağlıdır" deyir ki, siyahı dəyişəndə düzgün yenilənsin.

`.reduce()` bir az fərqlidir — massivi GƏZİB, HƏR addımda bir "toplayıcı" dəyəri (yuxarıdakı misalda `cəm`) YENİLƏYİR, sonda TƏK bir nəticə qaytarır. `Orders.tsx`-də sifarişlərin statuslarını SAYMAQ üçün istifadə olunur (aşağıda ətraflı izah olunacaq).

### `async`/`await` və Promise — "gözlə, nəticə gələnə qədər"

Serverə sorğu göndərmək DƏRHAL bitmir (bir neçə millisaniyə çəkir). JavaScript bunu **Promise** (vəd) adlanan bir obyektlə idarə edir — "bu iş gələcəkdə bitəcək, bitəndə sənə xəbər verəcəm" deməkdir.

```ts
// .then() forması:
fetch('/api/data').then((cavab) => {
  console.log(cavab)  // sorğu bitəndə bura işə düşür
})

// async/await forması (eyni məna, daha oxunaqlı):
async function məlumatAl() {
  const cavab = await fetch('/api/data')  // bu sətirdə DAYANIR, sorğu bitənə qədər gözləyir
  console.log(cavab)                       // sonra buraya keçir
}
```
- `async` — funksiyanın daxilində `await` istifadə edəcəyini bildirir.
- `await` — "bu Promise bitənə qədər gözlə, sonra nəticəni bu dəyişənə yaz".
- `try { ... } catch (err) { ... }` — `await`-lə gözlədiyiniz iş XƏTA versə (məsələn, server 400/500 qaytarsa), proqram dayanmır, `catch` blokuna keçir, orada xətanı idarə edə bilirsiniz.

```ts
try {
  await createCategory(payload)   // uğurlu olarsa davam edir
} catch (err) {
  toast.error(err instanceof Error ? err.message : 'Xəta baş verdi')  // xəta olarsa buraya düşür
}
```
`err instanceof Error ? ... : ...` niyə belədir — Hissə 3-də (`unknown` bölməsində) izah olunur, çünki bu, MƏHZ TypeScript-in tələb etdiyi bir yoxlamadır.

### React-in özü: komponent, `props`, JSX

```tsx
function Salamla({ ad }) {          // bu bir KOMPONENTDİR — böyük hərflə başlayan funksiya
  return <h1>Salam, {ad}!</h1>      // JSX — HTML-ə bənzəyən, əslində JavaScript olan sintaksis
}

<Salamla ad="Əli" />                // istifadəsi — "ad" adlı PROP verilir
```
- **Komponent** = UI-nin bir hissəsini qaytaran funksiya.
- **Props** = komponentə kənardan verilən "parametrlər" (`<Button variant="solid">` — `variant` bir prop-dur).
- **JSX** = `<div>...</div>` kimi görünən, amma əslində arxa planda `React.createElement(...)` çağırışlarına çevrilən sintaksis. JSX daxilində `{}` yazsanız, içində "təmiz JavaScript" işlədə bilərsiniz (`{ad}`, `{say + 1}`, `{items.map(...)}`).

### `useState` — komponentin "yaddaşı"

```tsx
const [say, setSay] = useState(0)
// say → CARİ dəyər (başlanğıcda 0)
// setSay → say-ı DƏYİŞMƏK üçün funksiya
// setSay(5) çağırsanız, React komponenti YENİDƏN render edir, say artıq 5 olur

<button onClick={() => setSay(say + 1)}>Bas: {say}</button>
```
`useState`-siz, komponent daxilindəki adi dəyişənlər hər render-də "sıfırlanır" və ekranda dəyişiklik göstərmir. `useState` React-a "bu dəyəri render-lər arasında yadda saxla və dəyişəndə ekranı yenilə" deyir.

### `useEffect` — "yan təsir" (side effect)

```tsx
useEffect(() => {
  document.title = 'Yeni başlıq'   // bu, komponent EKRANA ÇIXANDA (mount) işə düşür

  return () => {
    document.title = 'Köhnə başlıq' // bu isə komponent EKRANDAN GEDƏNDƏ (unmount) işə düşür
  }
}, [])  // [] boş massiv = "yalnız BİR DƏFƏ, mount olanda işə sal"
```
`useEffect`-in ikinci parametri (`[]`, `[title]`, `[open, onClose]` və s.) **"dependency array"** adlanır — siyahıdakı dəyərlərdən HƏR HANSI biri dəyişəndə effekt YENİDƏN işə düşür. Boş `[]` = yalnız ilk dəfə. Heç yazmasanız = HƏR render-də (nadir hallarda istifadə olunur).

### `useMemo` — hesablamanı "yaddan çıxarmamaq" (cache)

```tsx
const filtered = useMemo(
  () => items.filter((i) => i.name.includes(search)),  // bu hesablama
  [items, search],                                        // yalnız bunlar dəyişəndə TƏKRAR işə düşür
)
```
`useMemo`-suz, komponent HƏR render-də (məsələn, başqa bir düymə klikləndə) bu filtri YENİDƏN hesablayardı, hətta `items`/`search` dəyişməsə belə. `useMemo` "əgər asılılıqlar eyni qalıbsa, köhnə nəticəni saxla, təzədən hesablama" deyir.

### Custom hook — öz `useXxx()` funksiyanız

Adı `use` ilə başlayan İSTƏNİLƏN funksiya "hook" sayılır. Bunun daxilində `useState`/`useEffect` kimi hazır hook-ları işlədib, öz təkrarlanan məntiqinizi bir yerə yığa bilərsiniz (bu layihədə `usePagination`, `useCrudModal`, `useTitle`, `useDebounce` — hamısı buna misaldır, aşağıda ətraflı izah olunub).

### CSS Modules idxalı

```ts
import styles from './Button.module.css'
// styles = { btn: 'Button-module__btn__aB3xZ', solid: 'Button-module__solid__k9F2p', ... }

<button className={styles.btn}>...</button>
```
`.module.css` şəklində bitən fayllar CSS Modules sayılır — Vite onları avtomatik tanıyır, hər klas adını UNİKAL edir (`.btn` → `Button-module__btn__aB3xZ` kimi bir şeyə çevrilir) ki, başqa faylda da `.btn` yazsanız TOQQUŞMA olmasın. `styles` obyekti CSS faylındakı klas adlarını JavaScript-dən əlçatan edir. (TypeScript-in bunu necə "tanıdığı" Hissə 20-də izah olunur.)

---

## Hissə 3: TypeScript lüğəti

**Bu bölmə, sizin XÜSUSİLƏ istədiyiniz hissədir — TypeScript-in NƏ olduğunu, NƏ üçün lazım olduğunu və hər bir simvolun DƏQİQ nə mənaya gəldiyini, ADDIM-ADDIM izah edir.** Digər bölmələrdəki (Hissə 6-dan sonra) HƏR fayl artıq TypeScript-dədir — bu bölməni oxumadan onlara keçsəniz, `interface`, `<T>`, `:` kimi işarələr sizə "qəliz" görünəcək. Əvvəlcə bunu oxuyun.

### TypeScript ÜMUMİYYƏTLƏ nədir?

TypeScript, JavaScript-in ELƏ ÖZÜDÜR — sadəcə ÜZƏRİNƏ "bu dəyər HANSI NÖVDƏNDİR" məlumatını (bunu **"tip"** və ya **"type"** adlandırırıq) əlavə edən bir dildir. Kodu brauzerdə İŞƏ SALMAZDAN ƏVVƏL, `tsc` (TypeScript Compiler) adlı bir alət bütün faylları OXUYUR və "bu funksiyaya YANLIŞ NÖV data verilib" kimi səhvləri TAPIR.

**Konkret misal — TypeScript OLMADAN (adi JS):**
```js
function cəmlə(a, b) {
  return a + b
}

cəmlə(5, 10)        // 15 — düzgün işləyir
cəmlə(5, "salam")   // "5salam" — SƏHVDİR (bir-birinə əlavə olunub, cəmlənməyib), AMMA proqram ÇÖKMÜR,
                     // sadəcə YANLIŞ NƏTİCƏ verir — bu SƏHVİ YALNIZ EKRANDA GÖRƏNDƏ ("5salam" niyə çıxdı?) TUTURSUNUZ
```

**EYNİ KOD, TypeScript İLƏ:**
```ts
function cəmlə(a: number, b: number): number {
  return a + b
}

cəmlə(5, 10)        // 15 — düzgün
cəmlə(5, "salam")   // REDAKTORDA DƏRHAL QIRMIZI XƏTT: "Argument of type 'string' is not assignable to parameter of type 'number'"
                     // — YƏNİ, KODU YAZARKƏN, HƏLƏ İŞƏ SALMADAN, SƏHV DƏRHAL GÖRÜNÜR
```

`a: number` — "`a` parametri MÜTLƏQ bir RƏQƏM olmalıdır" deməkdir. `: number` hissəsi — **tip annotasiyası** (type annotation) adlanır.

### Əsas tiplər (types)

```ts
let ad: string = 'Əli'           // mətn (sətir)
let yaş: number = 25              // rəqəm (həm tam, həm kəsr — JS-də ayrı "int"/"float" yoxdur)
let aktivdir: boolean = true      // true/false
let heçNə: null = null            // "bilərəkdən boş" dəyər
let təyinOlunmayıb: undefined = undefined  // "hələ dəyər verilməyib"
let siyahı: string[] = ['a', 'b'] // STRİNG-lərdən ibarət MASSİV (`string[]` = "massiv, hər elementi string")
let rəqəmSiyahı: number[] = [1, 2, 3]
```
JavaScript-də bu dəyərlər onsuz da MÖVCUDDUR (`'Əli'` onsuz da bir string-dir) — TypeScript sadəcə "bunu SİZ NİYYƏT EDİRSİNİZ, YOXSA GƏLƏCƏKDƏ SƏHVƏN BAŞQA BİR NÖV YAZILACAQ?" sualını əvvəlcədən yoxlayır.

**"Tip inference" (avtomatik tip tapma)** — HƏR YERDƏ `: string` yazmaq lazım DEYİL, TypeScript ÇOX VAXT ÖZÜ TAPIR:
```ts
const ad = 'Əli'        // TypeScript ÖZÜ bilir: "bu, string-dir" (çünki '...' ilə yazılıb)
// ad = 5                // XƏTA: artıq "string" olduğu bilinən dəyişənə rəqəm verə bilməzsiniz
```
Bu layihədə, dəyişənin tipi AÇIQ-AŞKAR GÖRÜNMÜRSƏ (`const x = ...` kimi, heç bir `: TipAdı` yoxdursa), demək TypeScript onu ÖZÜ, sağ tərəfdəki dəyərdən, avtomatik "çıxarıb" (infer edib).

### `interface` və `type` — "bu obyektin FORMASI belədir"

Bu, TypeScript-in ƏN ÇOX İSTİFADƏ OLUNAN xüsusiyyətidir — BİR OBYEKTİN HANSI SAHƏLƏRƏ (VƏ HANSI TİPLƏRDƏ) MALİK OLDUĞUNU TƏSVİR EDİR.

```ts
interface Category {
  id: number
  name: string
  description: string
  imageUrl: string
}

const kateqoriya: Category = {
  id: 1,
  name: 'İçkilər',
  description: 'Sərinləşdirici içkilər',
  imageUrl: '',
}
// kateqoriya.name = 5   // XƏTA: `name` STRING olmalıdır, rəqəm YOX
// kateqoriya.qiymet = 10  // XƏTA: `Category`-nin BELƏ bir sahəsi YOXDUR
```
`interface Category { ... }` — "`Category` adlı bir FORMA TƏYİN EDİRƏM: `id` rəqəm olmalıdır, `name` string olmalıdır" və s. Sonra `const kateqoriya: Category = {...}` yazanda, TypeScript bu obyektin DƏQİQ bu formaya UYĞUN olduğunu YOXLAYIR.

**`type` nədir, `interface`-dən FƏRQİ nədir?** Bu layihədə HƏR İKİSİ İSTİFADƏ OLUNUR:
```ts
type BadgeColor = 'green' | 'blue' | 'amber' | 'purple' | 'red'   // AŞAĞIDA "union" bölməsinə baxın
type StatusCounts = { TOTAL: number } & Partial<Record<OrderStatus, number>>  // AŞAĞIDA izah olunur
```
Praktik fərq: `interface` YALNIZ OBYEKT FORMASI təsvir edir (VƏ sonradan `extends` ilə GENİŞLƏNDİRİLƏ bilər), `type` isə İSTƏNİLƏN NÖV tip verə bilər — OBYEKT, UNION (aşağıda), YA DA sadəcə bir "ləqəb" (`type ID = number` kimi). Bu layihədə **qayda belədir**: obyekt formaları (API cavabları, komponent prop-ları) `interface` ilə, hər şey başqası (union-lar, kəsişmələr) `type` ilə yazılır — məhz bunu görəcəksiniz `src/types/` qovluğunda.

### `?` — "bu sahə OLA da bilər, OLMAYA da"

```ts
interface ButtonProps {
  variant?: string   // '?' OLMASA idi: HƏR YERDƏ <Button> işlədəndə MÜTLƏQ variant VERMƏLİ idiniz
  children: string   // '?' YOXDUR — bu sahə MÜTLƏQDİR, verilməsə XƏTA
}
```
`variant?: string` — "bu sahə YA STRİNGDİR, YA DA TAMAMİLƏ VERİLMƏYƏ BİLƏR (`undefined`)". Bu layihədə, demək olar HƏR yerdə "default dəyəri OLAN" prop-lar (`variant = 'solid'` kimi) `?` ilə işarələnir — çünki çağıran tərəf onu VERMƏSƏ DƏ, default dəyər onsuz da işə düşəcək.

### Union tiplər (`|`) — "bu, YA BU, YA DA O ola bilər"

```ts
type Ölçü = 'sm' | 'lg'                 // YALNIZ bu iki mətndən BİRİ ola bilər, BAŞQA HEÇ NƏ
type İD = number | string               // YA rəqəm, YA DA mətn ola bilər
type Nəticə = Category | null           // YA Category formasında obyekt, YA DA `null`

function seç(ölçü: Ölçü) { ... }
seç('sm')     // OK
seç('lg')     // OK
seç('md')     // XƏTA: 'md' bu union-un İÇİNDƏ YOXDUR
```
Bu, TypeScript-in "enum" (sabit siyahı) YAZMAĞIN ən çox işlədilən üsuludur. Bu layihədə, MƏSƏLƏN, sifariş statusları belə təyin olunub:
```ts
// lib/constants/orderStatus.ts-də, ETIKET obyektindən AVTOMATİK törədilir (aşağıda izah olunur):
type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED'
```
Yəni, `status` dəyişəni İSTƏNİLƏN mətn DEYİL, YALNIZ bu 6 mətndən BİRİ ola bilər — səhvən `status = 'PENDINGG'` (əlavə "G") yazsanız, TypeScript DƏRHAL tutar.

### `&` (intersection) — "bu tiplərin HAMISI BİRLİKDƏ"

`|` (union) "YA BU YA DA O" demək olduğu halda, `&` (intersection) "HƏR İKİSİ EYNİ ANDA" deməkdir — iki (və ya daha çox) tipin BÜTÜN sahələrini BİRLƏŞDİRİR:
```ts
type A = { x: number }
type B = { y: string }
type AB = A & B   // { x: number, y: string } — İKİSİNİN DƏ sahələri MÜTLƏQ olmalıdır
```
Bu layihədə, `Orders.tsx`-də BELƏ İSTİFADƏ OLUNUR:
```ts
type StatusCounts = { TOTAL: number } & Partial<Record<OrderStatus, number>>
```
Oxunuşu: "`StatusCounts`, HƏM `{ TOTAL: number }` (yəni `TOTAL` sahəsi MÜTLƏQ var VƏ rəqəmdir), HƏM DƏ `Partial<Record<OrderStatus, number>>` (aşağıda izah olunur — HƏR statusun sayını, AMMA OPSİONAL şəkildə saxlaya bilən bir obyekt)". Bunun NİYƏ belə yazıldığı Hissə 18-də (`Orders.tsx`-in izahında) ətraflı göstərilir.

### Generic-lər (`<T>`) — "İSTƏNİLƏN TİP ÜÇÜN İŞLƏYƏN funksiya/tip"

Bu, İLK BAXIŞDA ƏN ÇƏTİN görünən mövzudur, AMMA məntiqi SADƏDİR: bəzən bir funksiya YA DA TİP, "hansı NÖV data ilə işlədiyindən ASILI OLMAYARAQ" EYNİ ŞƏKİLDƏ İŞLƏMƏLİDİR. Generic — bunun üçün bir "DƏYİŞƏN TİP ADI"DIR (adətən `T` hərfi işlədilir, "Type"-ın qısaldılmışı).

**Çox sadə bir misal:**
```ts
function birinci<T>(massiv: T[]): T {
  return massiv[0]
}

birinci([1, 2, 3])           // T = number OLARAQ İŞLƏYİR, NƏTİCƏ: number
birinci(['a', 'b', 'c'])     // T = string OLARAQ İŞLƏYİR, NƏTİCƏ: string
birinci([{id: 1}, {id: 2}])  // T = {id: number} OLARAQ İŞLƏYİR
```
`<T>` — "bu funksiya, İSTƏNİLƏN TİPLƏ (`T` adlandırırıq) İŞLƏYƏ BİLƏR, AMMA HANSI TİPLƏ ÇAĞIRILSA, NƏTİCƏ DƏ EYNİ TİPDƏN OLACAQ" deməkdir. `birinci([1,2,3])` çağıranda, TypeScript ÖZÜ görür ki, massivin elementləri `number`-dir, deməli `T = number`, DEMƏLİ NƏTİCƏ DƏ `number` olmalıdır (`string` YOX).

**Bu layihədə əsl istifadə — `usePagination`:**
```ts
export function usePagination<T>(items: T[], initialPageSize = 5) {
  // ... (aşağıda tam izah olunur)
  return { page, setPage, pageSize, setPageSize, paged }
  // `paged` da T[] TİPİNDƏDİR
}
```
Bu hook, Kateqoriyalar səhifəsində `usePagination(filtered)` (burada `filtered: Category[]`) ÇAĞIRILANDA `T = Category` olur, İstifadəçilər səhifəsində isə `usePagination(filtered)` (`filtered: User[]`) ÇAĞIRILANDA `T = User` olur — **EYNİ FUNKSİYA, HƏR İKİ SƏHİFƏDƏ İŞLƏYİR**, AMMA hər dəfə "TAM DOĞRU" tiplə (`paged` nəticəsi Kateqoriyalar səhifəsində `Category[]`, İstifadəçilər səhifəsində `User[]` OLUR — QARIŞMIR).

**Niyə bu vacibdir?** Generic OLMASAYDI, YA HƏR SƏHİFƏ ÜÇÜN AYRI bir `usePaginationCategories`, `usePaginationUsers` YAZMALI OLARDIQ (TƏKRARÇILIQ), YA DA `paged`-i "İSTƏNİLƏN TİP OLA BİLƏR" (`any`, AŞAĞIDA İZAH OLUNUR) EDİB TİP TƏHLÜKƏSİZLİYİNİ TAMAMİLƏ İTİRƏRDİK. Generic HƏR İKİSİNİN ORTASI — BİR FUNKSİYA, AMMA HƏR ÇAĞIRIŞDA DÜZGÜN TİPLƏ.

**Bu layihədə generic olan YERLƏR (CƏMİ 5 YER, BAŞQA HEÇ YERDƏ YOXDUR — BİLƏRƏKDƏN BELƏ SAXLANILIB):**
- `usePagination<T>` — istənilən siyahını səhifələmək üçün.
- `useCrudModal<TItem, TForm>` — İKİ AYRI GENERİK (`TItem` — siyahı elementi, `TForm` — forma) — çünki BUNLAR FƏRQLİ FORMALARDIR (məs. `Product` VƏ `ProductForm` fərqlidir, aşağıda görəcəksiniz).
- `useDebounce<T>` — İSTƏNİLƏN TİPDƏ bir dəyəri "gecikdirmək" üçün (adətən `string`, amma prinsipcə hər şey ola bilər).
- `api.get<T>()`, `api.post<T>()` və s. (`axiosInstance.ts`-də) — "bu sorğunun CAVABI HANSI FORMADADIR" demək üçün, HƏR SERVİS FAYLINDA FƏRQLİ `T` İLƏ ÇAĞIRILIR.

### `unknown` və `any` — "tipini bilmirəm" ÜÇÜN İKİ FƏRQLİ YANAŞMA

**`any`** — "bu dəyərin İSTƏNİLƏN TİPDƏ OLA BİLƏCƏYİNİ" bildirir VƏ TypeScript-ə "BUNU ARTIQ YOXLAMA, MƏNƏ ETİBAR ET" deyir. **BU LAYİHƏDƏ `any` YAZILMASI QADAĞANDIR** (`.oxlintrc.json`-da `typescript/no-explicit-any: error` qaydası İLƏ MƏCBURİ EDİLİR) — çünki `any` yazan kimi, TypeScript O DƏYİŞƏN ÜÇÜN BÜTÜN YOXLAMALARI DAYANDIRIR, YƏNİ TypeScript-in BÜTÜN FAYDASINI SIFIRLAYIRSINIZ.

**`unknown`** — BU DA "tipini BİLMİRƏM" DEMƏKDİR, AMMA `any`-DƏN FƏRQLİ OLARAQ, TypeScript SİZƏ O DƏYƏRİ İSTİFADƏ ETMƏZDƏN ƏVVƏL **MÜTLƏQ YOXLAMA** ("bu, DOĞRUDAN DA bu tipdəndir?") TƏLƏB EDİR:
```ts
function məlumatıGöstər(dəyər: unknown) {
  console.log(dəyər.toUpperCase())  // XƏTA: `dəyər`-in `toUpperCase()` METODU olduğunu HƏLƏ BİLMİRİK

  if (typeof dəyər === 'string') {
    console.log(dəyər.toUpperCase())  // OK İNDİ — YOXLAMADAN SONRA, TypeScript "bu, DOĞRUDAN DA string-dir" DEYƏ QƏBUL EDİR
  }
}
```
Bu, **"daraltma" (narrowing)** adlanır — `if (typeof ... === '...')` KİMİ BİR YOXLAMA İLƏ, `unknown`-u DAHA DƏQİQ BİR TİPƏ "DARALDIRSINIZ".

**Bu layihədə `unknown` DƏQİQ 3 YERDƏ var, BAŞQA HEÇ YERDƏ YOXDUR:**

1. **`catch (err)` bloklarında** — TypeScript-də, `catch`-ə düşən `err` HƏMİŞƏ AVTOMATİK `unknown`-dır (çünki JavaScript-də İSTƏNİLƏN DƏYƏR "atıla" (throw) bilər — `throw 'sadə mətn'` da, `throw {obyekt: 1}` da mümkündür, ona görə TypeScript "bu, MÜTLƏQ `Error` OLACAQ" DEYƏ FƏRZ ETMİR). Ona görə HƏR yerdə BELƏ YAZILIB:
```ts
try {
  await login(phone, password)
} catch (err) {
  toast.error(err instanceof Error ? err.message : 'Xəta baş verdi')
}
```
`err instanceof Error` — "`err` HƏQİQƏTƏN bir `Error` OBYEKTİDİRMİ?" YOXLAYIR (DARALDIR). DOĞRUDURSA, `err.message`-ə TƏHLÜKƏSİZ MÜRACİƏT EDƏ BİLİRİK (çünki İNDİ TypeScript "bu, `Error`-DUR, `.message` SAHƏSİ MÖVCUDDUR" DEYƏ BİLİR). YANLIŞDIRSA (nadir hal), ÜMUMİ bir mesaj göstərilir. **Bu layihədə `axiosInstance.ts` HƏMİŞƏ sadə bir `Error` OBYEKTİ "ATIR"** (aşağıda Hissə 9-da izah olunur), ona görə praktikada BU YOXLAMA HƏMİŞƏ DOĞRU ÇIXIR, AMMA TypeScript BUNU "BİLMİR" (bunu BİLMƏSİ ÜÇÜN "runtime yoxlama" — YƏNİ KODUN ÖZÜNDƏ BELƏ BİR `instanceof` YAZILMASI — LAZIMDIR).

2. **`JSON.parse`-in nəticəsində** (`lib/auth/session.ts`-də):
```ts
export function getStoredProfile(): Profile | null {
  const raw = localStorage.getItem(PROFILE_KEY)
  return raw ? (JSON.parse(raw) as Profile) : null
}
```
`JSON.parse(...)` — brauzerin ÖZ FUNKSİYASIDIR, o, mətni obyektə çevirir, AMMA TypeScript "bu obyektin DƏQİQ FORMASI NƏDİR" bilə BİLMƏZ (çünki mətn İSTƏNİLƏN ŞEY OLA BİLƏR). Ona görə `as Profile` YAZILIB (AŞAĞIDA "`as`" bölməsinə baxın) — "buna ETİBAR ET, bu, `Profile` FORMASINDADIR" DEYİRİK, çünki BU KODUN ÖZÜ (`saveSession` funksiyası) `localStorage`-a MƏHZ BU FORMANI YAZIR, BAŞQA HEÇ NƏ.

3. **`axiosInstance.ts`-də, server cavabı ENVELOPE-DAN (zərfdən) ÇIXARILMAZDAN ƏVVƏL** — aşağıda Hissə 9-da ətraflı izah olunur.

**Qısa QAYDA:** `any` — HEÇ VAXT yazmayın (VƏ layihə buna YOL VERMİR). `unknown` — YALNIZ yuxarıdakı 3 həqiqi sərhəddə görəcəksiniz, VƏ hər dəfə istifadədən ƏVVƏL bir YOXLAMA (`instanceof`, `typeof`, YA DA `as` — sənədləşdirilmiş halda) VAR.

### `as` — "tip assersiyası" (məcburi çevirmə)

```ts
const dəyər = JSON.parse(raw) as Profile
const status = e.target.value as OrderStatus
```
`as TipAdı` — TypeScript-ə "MƏN BU DƏYƏRİN HANSI TİPDƏ OLDUĞUNU SƏNDƏN DAHA YAXŞI BİLİRƏM, BUNA ETİBAR ET" DEYİR. **DİQQƏT:** bu, HEÇ BİR RUNTIME (KODUN İŞLƏMƏ ANINDA) YOXLAMA ETMİR — sadəcə TypeScript-in COMPILE VAXTI (KODU YAZARKƏN) yoxlamasını "SUSDURUR". Ona görə `as` YALNIZ SİZ DOĞRUDAN DA ƏMİN OLDUĞUNUZ yerlərdə işlədilməlidir (VƏ bu layihədə İSTİFADƏ OLUNAN HƏR `as` ÜÇÜN, YAXINLIQDA BİR ŞƏRH VAR — NİYƏ TƏHLÜKƏSİZ OLDUĞUNU İZAH EDƏN).

**Bu layihədə `as` harada işlədilir:**
- `JSON.parse(raw) as Profile` (yuxarıda izah olundu).
- `e.target.value as OrderStatus` / `as ProductType` — HTML `<select>` elementinin `onChange`-i HƏMİŞƏ `string` QAYTARIR (HƏTTA `<option>`-ların dəyərləri `OrderStatus` KİMİ MƏHDUD OLSA BELƏ, BROWSER BUNU BİLMİR), AMMA BİZ BİLİRİK Kİ, seçilə BİLƏN YEGANƏ dəyərlər MƏHZ `ORDER_STATUS_OPTIONS`/`PRODUCT_TYPE_OPTIONS`-DAKI dəyərlərdir (çünki `<option>`-lar MƏHZ bu siyahıdan qurulur) — ona görə `as OrderStatus` TƏHLÜKƏSİZDİR.
- `api as unknown as UnwrappedApi` (`axiosInstance.ts`-də, YALNIZ BİR YERDƏ) — Hissə 9-da ƏTRAFLI izah olunur, LAYİHƏDƏKİ ƏN "MÜRƏKKƏB" tip yazısıdır, AMMA NİYƏ LAZIM OLDUĞU sadə bir səbəbə əsaslanır.

**`as unknown as X` NİYƏ İKİ DƏFƏ `as`?** Bəzən İKİ TİP BİR-BİRİLƏ "STRUKTURCA" ÇOX FƏRQLİDİR (TypeScript "bunlar ƏSLA EYNİ ŞEY OLA BİLMƏZ" DEYİR VƏ BİRBAŞA `as`-A İCAZƏ VERMİR) — BELƏ HALDA, ƏVVƏLCƏ `as unknown` (HƏR ŞEYƏ ÇEVRİLƏ BİLƏN "NEYTRAL" TİP) EDİB, SONRA ORADAN HƏDƏF TİPƏ (`as UnwrappedApi`) ÇEVİRİRİK — İKİ ADDIMLI "MƏCBURİ KÖRPÜ". Bu, LAYİHƏDƏ **CƏMİ BİR DƏFƏ** İŞLƏDİLİB, VƏ BİLƏRƏKDƏN BAŞQA HEÇ YERDƏ TƏKRARLANMAYIB.

### `satisfies` — "`as`-a BƏNZƏYİR, AMMA TƏHLÜKƏSİZDİR"

```ts
<Outlet context={{ search: debouncedSearch } satisfies LayoutOutletContext} />
```
`dəyər satisfies TipAdı` — "bu dəyərin `TipAdı`-NA UYĞUN OLDUĞUNU YOXLA, AMMA (`as`-dan FƏRQLİ OLARAQ) dəyərin ÖZ DƏQİQ TİPİNİ (`{search: string}` kimi) DƏYİŞDİRMƏ". Fərq incədir: `as` "MƏNƏ ETİBAR ET, YOXLAMA" deyir, `satisfies` isə "BUNU YOXLA (VƏ SƏHVSƏ XƏTA VER), AMMA NƏTİCƏNİ ÖZ HALINDA BURAX" deyir — YƏNİ `satisfies` DAHA TƏHLÜKƏSİZDİR, ÇÜNKİ HƏQİQİ BİR YOXLAMA APARIR (AS ISƏ HEÇ BİR YOXLAMA APARMIR, SADƏCƏ "SUSDURUR"). Bu layihədə `AdminLayout.tsx`-də, `Outlet`-ə ÖTÜRÜLƏN OBYEKTİN DƏQİQ `{search: string}` FORMASINDA OLDUĞUNU TƏSDİQLƏMƏK ÜÇÜN İŞLƏDİLİB.

### `Record<Açar, Dəyər>` — "bu açarlarla bu tipdə dəyərlər olan obyekt"

```ts
type Rənglər = Record<'yaşıl' | 'qırmızı', string>
// yuxarıdakı, AŞAĞIDAKI İLƏ EYNİ MƏNADADIR:
type Rənglər2 = { yaşıl: string; qırmızı: string }

const r: Rənglər = { yaşıl: '#00ff00', qırmızı: '#ff0000' }
```
`Record<K, V>` — "AÇARLARI `K` TİPİNDƏN, DƏYƏRLƏRİ `V` TİPİNDƏN OLAN bir OBYEKT" DEMƏKDİR. Bu layihədə, MƏSƏLƏN:
```ts
export const ORDER_STATUS_BADGE_COLOR: Record<OrderStatus, BadgeColor> = {
  PENDING: 'amber',
  CONFIRMED: 'blue',
  // ... (HƏR statusun BİR rəngi OLMALIDIR — TypeScript, HANSISA statusun ÇATIŞMADIĞINI BELƏ TUTUR!)
}
```
Bunun FAYDASI: `Record<OrderStatus, BadgeColor>` YAZDIQDAN SONRA, ƏGƏR `orderStatus.ts` FAYLINA YENİ BİR STATUS (MƏS. `"REFUNDED"`) ƏLAVƏ EDİLSƏ, AMMA `ORDER_STATUS_BADGE_COLOR`-A O STATUSUN RƏNGİ ƏLAVƏ EDİLMƏSƏ, TypeScript DƏRHAL XƏTA VERƏCƏK ("`REFUNDED` sahəsi ÇATIŞMIR") — YƏNİ YENİ STATUS ƏLAVƏ EDƏNDƏ, "UNUTMAQ" MÜMKÜN DEYİL.

### `Partial<X>` və `Pick<X, ...>` — MÖVCUD BİR TİPDƏN YENİ TİP "HASİL ETMƏK"

```ts
interface Profile {
  id: number
  full_name: string
  phone: string
}

type QismənProfile = Partial<Profile>
// = { id?: number; full_name?: string; phone?: string } — HƏR SAHƏ OPSİONAL OLUR

type YalnızAd = Pick<Profile, 'full_name'>
// = { full_name: string } — YALNIZ QEYD OLUNAN SAHƏ(LƏR) GÖTÜRÜLÜR
```
- `Partial<X>` — "`X`-in EYNİ SAHƏLƏRİ, AMMA HAMISI `?` İLƏ, YƏNİ OPSİONAL" DEMƏKDİR. Bu layihədə `orderService.ts`-də İŞLƏDİLİR: `getOrderStats()` SORĞUSUNUN CAVABI `Partial<OrderStats>` TİPİNDƏDİR — ÇÜNKİ BACKEND BƏZƏN BƏZİ SAHƏLƏRİ (MƏS. `CANCELLED`) QAYTARMIR (SƏNƏDLƏŞDİRİLMİŞ BİR BACKEND QÜSURUDUR, `docs/API.md`-yə BAXIN) — `Partial` BU RİYALLIĞI TİPİN ÖZÜNDƏ ƏKS ETDİRİR, YƏNİ "BU SAHƏLƏR OLA DA BİLƏR, OLMAYA DA" DEYİR, PROQRAMÇI BUNU UNUDA BİLMƏZ.
- `Pick<X, 'sahə1' | 'sahə2'>` — "`X`-DƏN YALNIZ BU SAHƏLƏRİ SEÇ" DEMƏKDİR. Bu layihədə `CategoryPayload` BELƏ TƏYİN OLUNUB:
```ts
export type CategoryPayload = Pick<CategoryApi, 'name' | 'description' | 'img_url'>
```
Oxunuşu: "`CategoryPayload`, `CategoryApi`-NİN YALNIZ `name`, `description`, `img_url` SAHƏLƏRİDİR" — ÇÜNKİ SERVERƏ YENİ KATEQORİYA YARADANDA `id`/`created_at` KİMİ SAHƏLƏRİ GÖNDƏRMİRİK (ONLARI SERVERİN ÖZÜ YARADIR), YALNIZ BU ÜÇÜNÜ.

### `keyof typeof` — "bu OBYEKTİN AÇARLARINDAN bir UNION TİP DÜZƏLT"

Bu, İLK BAXIŞDA QƏLİZ GÖRÜNSƏ DƏ, ÇOX FAYDALI bir TRİKDİR — bu layihədə `OrderStatus` VƏ `ProductType` TİPLƏRİ MƏHZ BELƏ YARADILIB:
```ts
export const ORDER_STATUS_LABELS = {
  PENDING: 'Gözləyir',
  CONFIRMED: 'Təsdiqləndi',
  PREPARING: 'Hazırlanır',
  READY: 'Hazırdır',
  DELIVERED: 'Çatdırıldı',
  CANCELLED: 'Ləğv edildi',
} as const   // AŞAĞIDA "as const" izah olunur

export type OrderStatus = keyof typeof ORDER_STATUS_LABELS
// NƏTİCƏ: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED'
```
`typeof ORDER_STATUS_LABELS` — "BU OBYEKTİN TİPİNİ MƏNƏ VER" (YƏNİ, DƏYƏRİN ÖZÜNÜ YOX, ONUN FORMASINI). `keyof ...` — "BU TİPİN BÜTÜN AÇARLARINI (KEY-LƏRİNİ) BİR UNION KİMİ VER". NƏTİCƏDƏ: `OrderStatus` AVTOMATİK OLARAQ `ORDER_STATUS_LABELS` OBYEKTİNİN 6 AÇARINDAN İBARƏT BİR UNION TİPİ OLUR.

**BUNUN NİYƏ VACİB OLDUĞU:** Əgər `OrderStatus`-U AYRICA, ƏL İLƏ YENİDƏN YAZSAYDIQ (`type OrderStatus = 'PENDING' | 'CONFIRMED' | ...`), İKİ YERDƏ (HƏM ETİKETLƏR OBYEKTİNDƏ, HƏM DƏ TİPDƏ) EYNİ SİYAHINI SAXLAMALI OLARDIQ — BİRİNİ YENİLƏYİB O BİRİNİ UNUTSAQ, SƏSSİZ (XƏBƏRDARLIQSIZ) BİR UYĞUNSUZLUQ YARANARDI. `keyof typeof` İLƏ, TİP AVTOMATİK OLARAQ ETİKETLƏR OBYEKTİNDƏN "TÖRƏYİR" — TƏK BİR MƏNBƏ (`ORDER_STATUS_LABELS`) VAR, TİP ONU SADƏCƏ "GÜZGÜLƏYİR".

### `as const` — "bu dəyəri, DƏQİQ YAZILDIĞI KİMİ, DƏYİŞMƏZ SAXLA"

```ts
const adiObyekt = { kg: 'Kiloqram', gr: 'Qram' }
// TypeScript BUNU BELƏ GÖRÜR: { kg: string; gr: string } — YƏNİ "kg" SAHƏSİ İSTƏNİLƏN string OLA BİLƏR

const sabitObyekt = { kg: 'Kiloqram', gr: 'Qram' } as const
// TypeScript BUNU BELƏ GÖRÜR: { readonly kg: 'Kiloqram'; readonly gr: 'Qram' } — YƏNİ "kg" SAHƏSİ
// MƏHZ "Kiloqram" MƏTNİDİR (İSTƏNİLƏN STRING YOX) VƏ DƏYİŞDİRİLƏ BİLMƏZ (`readonly`)
```
`as const` OLMADAN, YUXARIDAKI `keyof typeof` TRİKİ İŞLƏMƏZDİ — ÇÜNKİ TypeScript "kg" SAHƏSİNİN DƏYƏRİNİ "İSTƏNİLƏN STRING" (GENİŞ TİP) KİMİ GÖRSƏYDİ, "AÇARLARI ÇIXAR" (`keyof`) ETSƏK BELƏ, DƏYƏRLƏR HAQQINDA HEÇ NƏ DƏYİŞMƏZDİ (AMMA BİZƏ LAZIM OLAN, MƏHZ AÇARLARIN ÖZÜDÜR, ONA GÖRƏ BU KONKRET HALDA ƏSAS FAYDA BAŞQA YERDƏDİR: `as const` OLMASA, OBYEKTİN SAHƏLƏRİ "DƏYİŞDİRİLƏ BİLƏN" SAYILAR, BU İSƏ BƏZİ SIXI TİP YOXLAMALARINDA PROBLEM YARADAR). QISASI: BU LAYİHƏDƏ, "ETİKET" OBYEKTLƏRİNİN (`ORDER_STATUS_LABELS`, `PRODUCT_TYPE_LABELS`) SONUNA HƏMİŞƏ `as const` YAZILIB — BUNU BİR "RİTUAL" KİMİ QƏBUL EDƏ BİLƏRSİNİZ: "MƏN BU OBYEKTİ SABİT BİR LÜĞƏT KİMİ İSTİFADƏ EDƏCƏYƏM, ONDAN TİP TÖRƏDƏCƏYƏM".

### `import type` / `export type` — "YALNIZ TİP ÜÇÜN idxal/ixrac"

```ts
import { useState } from 'react'                    // ADİ idxal — RUNTIME-da (kodun İŞLƏMƏ ANINDA) LAZIMDIR
import type { ReactNode } from 'react'               // TİP idxalı — YALNIZ TypeScript YOXLAMASI ÜÇÜN, KODUN
                                                       // ÖZÜNDƏ (brauzerdə) HEÇ BİR İZİ QALMIR, TAMAMİLƏ "SİLİNİR"
```
`type` açar sözü — İDXAL/İXRAC OLUNAN ŞEYİN YALNIZ BİR TİP (`interface`, `type`) OLDUĞUNU, RUNTIME-DA MÖVCUD OLMAYAN bir şey OLDUĞUNU bildirir. Bu VACİBDİR, ÇÜNKİ Vite KODU FAYL-FAYL, BİR-BİRİNDƏN ASILI OLMADAN "TƏRCÜMƏ" (transpile) EDİR — ƏGƏR `import type` YAZILMASA, Vite BƏZƏN "BU, RUNTIME-DA LAZIM OLAN BİR ŞEYDİR" DEYƏ SƏHVƏN DÜŞÜNƏ BİLƏR. Bu layihədə `tsconfig.json`-da `verbatimModuleSyntax: true` AYARI VAR — YƏNİ, ƏGƏR SİZ TİP İDXAL EDİB `import type` YAZMASANIZ, TypeScript BUNU **XƏTA** SAYIR (SADƏCƏ TÖVSİYƏ DEYİL, MƏCBURİDİR).

**Necə BİLİRİK NƏ VAXT `import type` YAZMALI?** ƏGƏR GƏTİRDİYİNİZ ŞEY BİR `interface`/`type`-DIRSA (MƏS. `Category`, `LayoutOutletContext`), `import type` YAZIN. ƏGƏR BİR FUNKSİYA/DƏYƏR/KOMPONENTDİRSƏ (MƏS. `useState`, `Button`), ADİ `import` YAZIN. BƏZƏN İKİSİ QARIŞIQ OLUR:
```ts
import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
```

### Funksiya tipləri (`(param: Tip) => QaytarılanTip`)

```ts
interface ButtonProps {
  onClick?: () => void                    // parametrsiz funksiya, HEÇ NƏ qaytarmır
  onSearchChange?: (value: string) => void // BİR string parametri alır, HEÇ NƏ qaytarmır
}
```
`() => void` — "BU, BİR FUNKSİYADIR, PARAMETRİ YOXDUR, VƏ HEÇ NƏ (`void`) QAYTARMIR" DEMƏKDİR. `void` — "BU FUNKSİYANIN QAYTARDIĞI DƏYƏRDƏN İSTİFADƏ ETMƏYƏCƏYİK" MƏNASINDADIR (`undefined`-DƏN FƏRQLİ OLARAQ, DAHA "NİYYƏT BİLDİRƏN" BİR TİPDİR). Bu layihədə HƏR `onClick`, `onChange`, `onView` VƏ S. KİMİ "CALLBACK" (GERİ ÇAĞIRIŞ) PROP-LARI BELƏ TİPLƏNİR.

### Class-larda `override` açar sözü

```ts
class ErrorBoundary extends Component<Props, State> {
  override state: State = { hasError: false }
  override componentDidCatch(error: Error, info: ErrorInfo) { ... }
  override render() { ... }
}
```
`extends Component` — "`ErrorBoundary`, React-ın ÖZ `Component` SİNFİNDƏN MİRAS ALIR" DEMƏKDİR (Hissə 2-də QEYD OLUNUB). `override` — "MƏN BURADA, VALİDEYN SİNİFDƏ (`Component`) ARTIQ MÖVCUD OLAN BİR ÜZVÜ (`state`, `componentDidCatch`, `render`) BİLƏRƏKDƏN YENİDƏN TƏYİN EDİRƏM" DEMƏKDİR. Bunsuz da kod İŞLƏYƏRDİ, AMMA `tsconfig.json`-DA `noImplicitOverride: true` AYARI VAR — TypeScript-Ə "ƏGƏR BİR ÜZV DOĞRUDAN DA VALİDEYNDƏ VARSA, `override` YAZILMASINI MƏCBUR ET" DEYİR. **FAYDASI:** GƏLƏCƏKDƏ React ÖZ `Component` SİNFİNDƏN `componentDidCatch` ADLI ÜZVÜ SİLSƏ (VƏ YA ADINI DƏYİŞSƏ), SİZİN `override componentDidCatch` SƏTRİNİZ DƏRHAL XƏTA VERƏR ("BELƏ BİR ÜZV VALİDEYNDƏ YOXDUR") — YƏNİ "SƏSSİZ" (XƏBƏRDARLIQSIZ) BİR UYĞUNSUZLUQ YARANMIR.

### `ComponentPropsWithRef<'button'>` — HTML elementinin BÜTÜN "təbii" prop-larını "miras almaq"

```ts
interface ButtonProps extends ComponentPropsWithRef<'button'> {
  variant?: 'solid' | 'outline' | 'ghost' | 'ghostDanger'
  icon?: IconComponent
}
```
`ComponentPropsWithRef<'button'>` — React-IN ÖZ TİPİDİR, "ADİ HTML `<button>` ELEMENTİNİN QƏBUL ETDİYİ BÜTÜN PROP-LARI" (`onClick`, `disabled`, `type`, `className`, HƏTTA `ref` DAXİL — AŞAĞIDA İZAH OLUNUR) TƏMSİL EDİR. `interface ButtonProps extends ComponentPropsWithRef<'button'>` — "`ButtonProps`, BUNLARIN HAMISINI DA DAXİL EDİR, ÜSTÜNƏ ÖZ ƏLAVƏ PROP-LARIMIZI (`variant`, `icon`) DA QOŞUR" DEMƏKDİR. `extends` BURADA (YUXARIDAKI `class ... extends Component`-DƏN FƏRQLİ OLARAQ) "GENİŞLƏNDİRMƏ" MƏNASINDADIR — `interface`-lər ÜÇÜN, "BU FORMA, O FORMANIN BÜTÜN SAHƏLƏRİNİ DƏ EHTİVA EDİR" DEMƏKDİR.

**NİYƏ BU LAZIM OLDU?** `ConfirmModal.tsx`, `Button` KOMPONENTİNƏ `ref={cancelBtnRef}` VERİR (FOKUSLAMAQ ÜÇÜN, Hissə 14-də İZAH OLUNUR). `ref` XÜSUSİ BİR PROP-DUR (ADİ PROP-LAR KİMİ SƏRBƏST İSTİFADƏ OLUNA BİLMİR) — ONU `ButtonProps`-A ƏLAVƏ ETMƏK ÜÇÜN, ƏN SADƏ YOL, `ComponentPropsWithRef<'button'>`-DAN "MİRAS ALMAQ"DIR (React 19-da BU, ARTIQ `forwardRef` ADLI ƏLAVƏ BİR SARĞI YAZMADAN İŞLƏYİR).

### `declare module` — "kənar bir kitabxananın TİPLƏRİNƏ ƏLAVƏ EDİRƏM"

```ts
// src/types/api.ts-də:
import 'axios'
declare module 'axios' {
  export interface AxiosRequestConfig {
    skipAuthRetry?: boolean
    _retry?: boolean
  }
}
```
`declare module 'axios' { ... }` — "`axios` PAKETİNİN ÖZÜNÜN TİPLƏRİNƏ (BİZ YAZMAMIŞIQ, KİTABXANANIN ÖZÜ TƏMİN EDİR) ƏLAVƏ SAHƏLƏR ƏLAVƏ EDİRƏM" DEMƏKDİR. Bu, **"MODUL AUGMENTATION" (MODUL GENİŞLƏNDİRMƏSİ)** ADLANIR — LAYİHƏNİN ƏN QABAQCIL TİP-YAZMA TRİKİDİR, AMMA SƏBƏBİ SADƏDİR: `axiosInstance.ts`-DƏ, HƏR SORĞU KONFİQURASİYASINA (`config` OBYEKTİNƏ) ÖZ XÜSUSİ SAHƏLƏRİMİZİ (`skipAuthRetry`, `_retry`) ƏLAVƏ EDİRİK (Hissə 9-da İZAH OLUNUR), AMMA `axios` PAKETİNİN ÖZÜ BU SAHƏLƏRİ TANIMIR (ÇÜNKİ BUNLAR BİZİM ÖZ İCADIMIZDIR). `declare module` OLMASA, `config.skipAuthRetry` YAZANDA TypeScript "AXIOS-UN BELƏ BİR SAHƏSİ YOXDUR" DEYƏ XƏTA VERƏRDİ. BU BLOK, "AXİOS-UN ÖZ TİPİNƏ, KƏNARDAN, BU İKİ SAHƏNİ ƏLAVƏ EDİRƏM" DEYİR — BUNDAN SONRA BÜTÜN LAYİHƏ BOYU, AXİOS-UN CONFIG OBYEKTLƏRİNDƏ BU İKİ SAHƏ TANINIR.

### `noUncheckedIndexedAccess` — "obyektdən DİNAMİK açarla oxuyanda, TAPILMAMA EHTİMALINI DA GÖSTƏR"

Bu, KODDA GÖRÜNƏN bir SİNTAKSİS DEYİL, `tsconfig.json`-DA AKTİV EDİLƏN bir AYARDIR, AMMA NƏTİCƏSİNİ KODDA HİSS EDİRSİNİZ:
```ts
const ORDER_STATUS_LABELS: Record<OrderStatus, string> = { ... }

function etiket(status: OrderStatus) {
  return ORDER_STATUS_LABELS[status]   // BU AYAR OLMASA: TypeScript DEYƏR "BU, HƏMİŞƏ `string`-DİR"
                                         // BU AYAR VARSA: TypeScript DEYƏR "BU, `string`-DİR, AMMA NƏZƏRİ
                                         // OLARAQ `undefined` DƏ OLA BİLƏR" (BƏZİ HALLARDA)
}
```
Bu AYAR, LOOKUP CƏDVƏLLƏRİNDƏN (`obj[dinamikAçar]` ŞƏKLİNDƏ) OXUYANDA, TypeScript-İ DAHA EHTİYATLI OLMAĞA MƏCBUR EDİR — "BU AÇAR HƏQİQƏTƏN MÖVCUDDURMU?" SUALINI DAHA CİDDİ QƏBUL ETDİRİR. Bu layihədə, BELƏ YERLƏRDƏ ARTIQ `?? ''` (Hissə 2-DƏKİ NULLISH COALESCING) KİMİ MÜDAFİƏLİ YAZI VAR İDİ (TypeScript-Ə KEÇMƏZDƏN ƏVVƏL DƏ), ONA GÖRƏ BU AYAR YENİ HEÇ BİR DƏYİŞİKLİK TƏLƏB ETMƏDİ — SADƏCƏ GƏLƏCƏKDƏ BELƏ BİR MÜDAFİƏNİ SƏHVƏN SİLMƏYİN QARŞISINI ALIR.

### Tip xətası gördükdə NƏ ETMƏLİ

Redaktorda (VÖ Code kimi) bir sətir altında QIRMIZI XƏTT görəndə, ÜZƏRİNƏ SIÇAN GƏTİRSƏNİZ, TypeScript SİZƏ MƏHZ HANSI TİPİN HANSI TİPƏ UYĞUN GƏLMƏDİYİNİ YAZIR. Terminal-da isə:
```
npm run typecheck
```
əmri BÜTÜN layihəni yoxlayıb, HƏR XƏTANI fayl adı + sətir nömrəsi İLƏ SİYAHI ŞƏKLİNDƏ göstərir. **Bu əmr, `npm run build`-DƏN FƏRQLİDİR** — `build` yalnız KODU BROWSER ÜÇÜN "TƏRCÜMƏ" edir, TİP SƏHVLƏRİNƏ BAXMIR BELƏ (Vite-in ÖZÜ tez tərcümə edən, tip yoxlamayan bir alət — `esbuild`/`rolldown` — işlədir); YALNIZ `npm run typecheck` (`tsc --noEmit`) HƏQİQƏTƏN TİPLƏRİ YOXLAYIR.

---

## Hissə 4: Qovluq strukturu

```
src/
├── app/               → Tətbiqin "işə düşmə nöqtəsi" (main.tsx, App.tsx)
├── routes/            → Marşrutlaşdırma (hansı URL-də hansı səhifə, giriş qoruması)
├── layouts/           → Bütün admin səhifələrini əhatə edən "çərçivə" (sidebar + header)
├── components/        → Yalnız layout-a aid komponentlər (Sidebar, Header)
├── pages/
│   ├── Login/          → Giriş səhifəsi (qorunmayıb, hamı görə bilər) — `index.tsx` + `hooks/`/`components/`/`styles/`
│   ├── NotFound/        → 404 səhifəsi
│   └── Protected/      → Login tələb edən 5 səhifə — HƏR BİRİ ÖZLÜYÜNDƏ BİR MİNİ-QOVLUQ AĞACIDIR, AŞAĞIDA ƏTRAFLI
├── shared/
│   ├── components/     → Hər yerdə təkrar istifadə olunan UI hissələri (Button, Modal, Table, FormField, ...)
│   └── hooks/          → Öz hook-larımız (usePagination, useCrudModal, useTitle, useDebounce)
├── types/              → BÜTÜN TypeScript tip tərifləri (bir NÖV üçün bir fayl) — Hissə 5-ə baxın
├── services/            → Backend-ə HTTP sorğusu göndərən funksiyalar (axios ilə)
├── store/              → Zustand ilə qlobal state (`useAuthStore` + `useThemeStore`, Hissə 17-yə baxın)
├── lib/
│   ├── adapters/         → API formatını UI formatına (və əksinə) çevirən funksiyalar
│   ├── auth/             → localStorage-da token saxlamaq/oxumaq
│   ├── constants/         → Sabit dəyərlər (enum → Azərbaycan dilində etiket xəritələri)
│   └── queryClient.ts     → TanStack Query-nin konfiqurasiyası
├── utils/              → `Pagination` komponenti, `formatDate` funksiyası, `resizeThumbnailUrl` funksiyası
├── assets/             → Şəkillər (login/delete illüstrasiyaları — `.webp`, aşağıda izah olunur)
├── index.css            → Bütün rənglər/ölçülər üçün CSS dəyişənləri (design token-lar) + qaranlıq rejim override-ları
└── vite-env.d.ts        → Vite-in öz tipləri + `.env` dəyişənlərinin tipi + CSS Modules tipi (Hissə 20-yə baxın)
```

**Ən böyük struktur fərqi (əgər köhnə, TEK-FAYLLI səhifə versiyasını görmüsünüzsə):** `shared/` qovluğunun İÇİNDƏ İKİ ALT-QOVLUQ var — `components/` (bütün görüntülü hissələr) VƏ `hooks/` (görüntüsüz məntiq); bu ayrım "bu, RENDER OLUNAN bir ŞEYDİRMİ, YOXSA sadəcə MƏNTİQDİRMİ?" sualına görə aparılıb. AMMA BUNDAN DA BÖYÜK BİR DƏYİŞİKLİK VAR: `pages/Protected/` DAXİLİNDƏKİ HƏR SƏHİFƏ (Categories, Campaigns, Products, Orders, Users) ARTIQ TƏK BİR `Xxx.tsx` FAYLI DEYİL — HƏR BİRİ ÖZ DAXİLİNDƏ 6-7 ALT-QOVLUĞA BÖLÜNMÜŞ BİR "MİNİ-TƏTBİQDİR". BUNUN NİYƏ VƏ NECƏ EDİLDİYİ, AŞAĞIDAKI YENİ BÖLMƏNİN MÖVZUSUDUR.

### Səhifə-daxili refactor: nə üçün, nəyə görə, hansı BÖLÜNDÜ, hansı BÖLÜNMƏDİ

**ƏVVƏLKİ VƏZİYYƏT (misal üçün, köhnə `Categories.tsx`) NECƏ İDİ?** Tək bir 224 sətirlik fayl: `emptyForm` sabiti, `toForm` çevirici, `columns` massivi, `useQuery`/3 `useMutation`, axtarış filtri, `usePagination`, `useCrudModal`, `handleSubmit`/`confirmDelete`, VƏ bütün JSX (başlıq, cədvəl, forma modalı, təsdiq modalı, detal modalı) — HAMISI EYNİ FUNKSİYANIN (`export default function Categories()`) İÇİNDƏ. `Products.tsx`/`Campaigns.tsx` da eyni ölçüdə idi, `Orders.tsx` isə (sıralama+filtrasiya əlavə olunandan sonra) 400+ sətrə çatmışdı.

**BU, NİYƏ PROBLEM İDİ?** Tək faylda hər şeyin olması özlüyündə "səhv" deyil — kiçik səhifələr üçün tam məntiqlidir. Problem, fayl BÖYÜDÜKCƏ üzə çıxır: (1) bir sətirlik dəyişiklik üçün belə 200+ sətirlik faylı diqqətlə oxumaq lazım gəlir, (2) eyni fayl daxilində "data necə gəlir" (`useQuery`), "modal necə açılır" (`useCrudModal`), "cədvəl necə görünür" (JSX) kimi FƏRQLİ MƏSULİYYƏTLƏR bir-birinə qarışır, (3) Git-də iki nəfər eyni səhifədə (məs. biri cədvələ sütun əlavə edir, o biri formaya sahə əlavə edir) işləyəndə, TAM EYNİ FAYLI dəyişdirdiklərinə görə "merge conflict" ehtimalı yüksəlir.

**ÜMUMİ QAYDA (bütün 5 səhifədə TƏKRARLANAN, bilərəkdən eyni saxlanan bir "şablon"):**

| Alt-qovluq | Nəyi saxlayır | NİYƏ məhz bura çıxarılıb |
|---|---|---|
| `index.tsx` | Səhifənin özü — YALNIZ "hansı hook-un nəticəsini hansı komponentə ötürürəm" (orkestrasiya) | Qalan hər şey çıxarıldıqdan sonra, geridə YALNIZ tərtibat (layout) qalır — bir baxışda "bu səhifədə nə var" sualının cavabı |
| `queries/` | `useXData.ts` (siyahı + axtarış + səhifələmə) və `useXMutations.ts` (yarat/yenilə/sil) | "Data HANSI MƏNBƏDƏN gəlir və necə YENİLƏNİR" sualı, "necə GÖRÜNÜR" sualından tamamilə ayrıdır — TanStack Query-yə aid məntiq JSX-dən asılı olmadan test/oxuna bilsin deyə |
| `hooks/` | `useXPage.ts` — CRUD modal state-i (`useCrudModal`) + submit/delete axını, `queries/`-in ÜZƏRİNDƏ qurulur | Bu, `queries/`-dən FƏRQLİDİR: server ilə "danışmır", sadəcə "hansı modal açıqdır, hansı sahələr doldurulub" kimi UI state-ini idarə edir — server rəyi (mutation) ilə UI state-i (modal) arasındakı "körpü" |
| `constants/` | `emptyForm.ts` (boş forma dəyərləri) və s. kiçik sabitlər | Bunlar nə "data", nə "state", nə də "görünüş" deyil — sadəcə sabit dəyərlərdir, öz balaca faylında olması, `index.tsx`-i doldurmaması üçün |
| `components/` | `XForm/`, `XDetails/` — modalların İÇİ (forma sahələri, detal görünüşü) | Cədvəldən tamamilə ayrı, öz-özlüyündə tam bir "alt-komponent" — hər biri öz qovluğunda (`CategoryForm/CategoryForm.tsx` + `index.ts`), Hissə 14-dəki `shared/components/` QOVLUQ QAYDASI ilə EYNİ SƏBƏBDƏN (aşağıda) |
| `table/` | `columns/` (sütun tərifləri + enləri) və `components/` (`XTable.tsx`, sətirlərin özü) | Cədvəl, səhifənin ən çox "böyüyən" hissəsidir (sütun sayı, enlər, filtr/sıralama) — ayrıca qovluqda olması, ONU təkbaşına, qalan hər şeyə toxunmadan dəyişməyə imkan verir |
| `pagination/` | `XPagination.tsx` — shared `Pagination`-ı çağıran nazik (thin) "sarğı" (wrapper) | Aşağıda, "NİYƏ HƏR SƏHİFƏNİN ÖZ PAGİNASİYA SARĞISI VAR?" bölməsində ətraflı |
| `styles/` | O səhifəyə aid BÜTÜN `.module.css` faylları (əvvəllər hər `.tsx`-in yanında idi) | Səhifənin bütün vizual "səthini" tək yerdə görmək üçün — CSS-i dəyişəndə, 6-7 fərqli qovluğu gəzmək əvəzinə, tək `styles/`-ə baxmaq kifayətdir |

**Bunu KONKRET nümunə üzərində görək — `Categories`:**
```
Categories/
├── index.tsx                          → 79 sətir, YALNIZ tərtibat
├── hooks/useCategoriesPage.ts          → modal state + submit/delete
├── queries/useCategoriesData.ts        → useQuery + axtarış filtri + usePagination
├── queries/useCategoryMutations.ts     → 3 useMutation (create/update/delete)
├── constants/emptyForm.ts              → boş forma dəyərləri
├── components/CategoryForm/            → forma modalının içi
├── components/CategoryDetails/         → "bax" modalının içi
├── table/columns/                      → sütun tərifləri + enləri
├── table/components/CategoriesTable.tsx → cədvəlin özü
├── pagination/CategoriesPagination.tsx → nazik pagination sarğısı
└── styles/*.module.css                 → 4 CSS faylı
```
Köhnə 224 sətirlik TƏK fayl, İNDİ 11 kiçik fayla bölünüb — HƏR BİRİ 10-65 sətir arasında, HƏR BİRİNİN TƏK BİR MƏSULİYYƏTİ VAR. `index.tsx`-in özü belə görünür:
```tsx
export default function Categories() {
  useTitle('Kateqoriyalar')
  const { search } = useOutletContext<LayoutOutletContext>()

  const { loading, filtered, page, setPage, pageSize, paged } = useCategoriesData(search)
  const { formOpen, setFormOpen, editing, defaultValues, deleteTarget, setDeleteTarget,
          viewTarget, setViewTarget, openCreate, openEdit, submitting, handleSubmit, confirmDelete } = useCategoriesPage()

  return (
    <div>
      {/* başlıq + "Yeni Kateqoriya" düyməsi */}
      <CategoriesTable items={paged} page={page} pageSize={pageSize} loading={loading} onView={setViewTarget} onEdit={openEdit} onDelete={setDeleteTarget} />
      <CategoriesPagination page={page} pageSize={pageSize} total={filtered.length} onPageChange={setPage} />
      <CategoryForm open={formOpen} onClose={() => setFormOpen(false)} editing={editing} defaultValues={defaultValues} submitting={submitting} onSubmit={handleSubmit} />
      <ConfirmModal open={!!deleteTarget} onCancel={() => setDeleteTarget(null)} onConfirm={confirmDelete} message="..." />
      <CategoryDetails category={viewTarget} onClose={() => setViewTarget(null)} />
    </div>
  )
}
```
Bu, İKİ HOOK ÇAĞIRIB, NƏTİCƏLƏRİ 5 KOMPONENTƏ "PAYLAYAN" bir funksiyadır — heç bir `useQuery`, heç bir `useMutation`, heç bir JSX-daxili `<input onChange=...>` yoxdur. **"Bu səhifə nə edir?" sualının cavabı, faylın ÖZÜNDƏN, HEÇ NƏYİ AÇMADAN oxuna bilir** — köhnə versiyada bu sualın cavabı üçün bütün 224 sətri oxumaq lazım idi.

**"BÖLMƏSƏYDİK NECƏ OLARDI?" — hər alt-qovluq üçün REAL alternativ:**
- **`queries/` VƏ `hooks/`-u BİRLƏŞDİRSƏYDİK** ("bir `useCategories.ts`, hər şey orada"): mümkün olardı, VƏ kiçik səhifələrdə (Users kimi) elə BELƏ EDİLİB DƏ (aşağıya baxın — Users-də ayrıca `hooks/` yoxdur, çünki CRUD modalı yoxdur, `queries/` təkbaşına kifayət edir). Categories/Products/Campaigns-də bölünməsinin səbəbi, `useCategoriesData` (server-oxuma) İLƏ `useCategoriesPage` (modal-state) arasındakı SƏRHƏDİN, Products səhifəsində (aşağıda) əlavə bir mürəkkəblik (kateqoriya dropdown-u üçün İKİNCİ bir sorğu) gəldikdə DAHA AYDIN qalmasıdır — birləşdirilsəydi, tək fayl yenidən böyüməyə başlayardı.
- **`components/XForm/`-u AYRICA QOVLUQ ETMƏYİB, birbaşa `components/XForm.tsx` YAZSAYDIQ** (Orders-də MƏHZ BELƏ EDİLİB — aşağıya baxın): FƏRQ YALNIZ QOVLUQ SƏVİYYƏSİNDƏDİR, məzmun eyni olardı. Categories/Products/Campaigns-də ayrıca qovluq seçilib, ÇÜNKİ HƏR FORMA/DETAL öz CSS faylı ilə "cütləşir" (`CategoryForm.module.css`) və gələcəkdə (məs. formaya alt-komponent əlavə olunsa) qovluğun içində qalması rahatdır; Orders-də isə `OrderDetails`/`OrderProductRow`/`OrderStatusSelect` ÜÇÜNÜN DƏ EYNİ `OrderDetails.module.css`-i PAYLAŞMASI SƏBƏBİNDƏN, ayrıca qovluqlara bölmək əlavə fayda vermirdi.
- **`table/`-u AYRICA ÇIXARMASAYDIQ, cədvəli birbaşa `index.tsx`-in İÇİNDƏ saxlasaydıq**: kiçik cədvəllər (6 sütun, Categories kimi) üçün bu, tamam işləyərdi — bölünmənin əsas FAYDASI, `Orders`-in table/ qovluğunda göründüyü kimi, cədvəl MÜRƏKKƏBLƏŞDİKDƏ (sıralama, filtr, tanstack-table) ortaya çıxır: o zaman `table/` özü daha 3 alt-qovluğa (`columns/`, `components/`, `hooks/`) bölünüb, VƏ bunun `index.tsx`-ə HEÇ BİR TƏSİRİ OLMAYIB (`index.tsx` hələ də sadəcə `<OrdersTable columns={columns} rows={paged} />` çağırır).
- **`constants/emptyForm.ts`-i ÇIXARMAYIB, `hooks/useCategoriesPage.ts`-in İÇİNDƏ saxlasaydıq**: mümkün olardı (bu, TƏK bir sabitdir), amma `constants/` qovluğu geniş MƏNADA "bu səhifəyə aid, dəyişməyən dəyərlər" üçün rezerv edilib — Orders-də bu qovluq `statCards.ts` + `statusTextColor.ts` kimi DAHA ÇOX sabit saxlayır, ONA GÖRƏ hər səhifədə eyni qovluq adının olması (məzmunu bir sabit də olsa) strukturu PROQNOZLAŞDIRILA BİLƏN edir — hər səhifədə "sabitlər haradadır?" sualının cavabı HƏMİŞƏ eynidir.

**Səhifələr arasındakı FƏRQLƏR TƏSADÜFİ DEYİL, HƏR BİRİNİN ÖZ SƏBƏBİ VAR (Hissə 18-də hər biri ayrıca izah olunur):**
- **Users**-də `hooks/`, `constants/`, `components/XForm/` YOXDUR — çünki bu səhifədə YARADbaMA/DÜZƏLTMƏ/SİLMƏ yoxdur (backend-də belə endpoint-lər də yoxdur), ona görə "modal-state" (`useCrudModal`) idarə edəcək heç nə qalmır, `queries/useUsersData.ts` təkbaşına kifayət edir.
- **Orders**-də `hooks/` (səhifə-səviyyəli) YOXDUR, ƏVƏZİNƏ `table/hooks/` VAR (`useOrdersTable`, `useOrderColumnDefs`, `useColumnMenu`) — çünki Orders-də "modal-state" yoxdur (yaratma/düzəltmə/silmə yoxdur, yalnız status dəyişdirmə), amma CƏDVƏLİN ÖZÜ (tanstack-table + sıralama + 4 filtr) o qədər mürəkkəbdir ki, ÖZ hook qatını tələb edir; həmçinin `utils/filters.ts` (filterFn-lər + tarix çevirmə funksiyaları) var, çünki bunlar nə "state", nə "sorğu", sadəcə SAF FUNKSİYALARDIR.
- **Products**-də hər şey Categories ilə EYNİDİR, YALNIZ `queries/`-də əlavə bir "kateqoriya dropdown-u üçün ikinci `useQuery`" var (Hissə 18-ə baxın).

### Qovluq adlandırma qaydası

**QOVLUQ ADLARININ HAMISI BÖYÜK HƏRFLƏ BAŞLAYIR** (`Login`, `NotFound`, `Protected`, `Categories` VƏ S.) — BU, TƏSADÜF DEYİL, LAYİHƏNİN QƏTİ QAYDASIDIR. Bir dəfə, `Protected` qovluğu DİSKDƏ SƏHVƏN `protected` (KİÇİK HƏRFLƏ) OLARAQ QALMIŞDI, HALBUKİ GİT (LAYİHƏNİN VERSİYA-İDARƏETMƏ SİSTEMİ) ONU ARTIQ BÖYÜK HƏRFLƏ (`Protected`) İZLƏYİRDİ — WINDOWS/MAC-İN FAYL SİSTEMİ HƏRFLƏRİN BÖYÜK/KİÇİK OLMASINA ƏHƏMİYYƏT VERMƏDİYİ ÜÇÜN (case-insensitive), BU UYĞUNSUZLUQ LOKAL KOMPÜTERDƏ HEÇ BİR PROBLEM YARATMIRDI — AMMA LİNUX SERVERLƏRDƏ (HƏRFLƏRİN BÖYÜK/KİÇİK OLMASI ƏHƏMİYYƏTLİDİR, case-sensitive) BU, İMPORT YOLLARININ SINMASINA SƏBƏB OLARDI. Bu SƏHV TAPILIB DÜZƏLDİLİB — ONA GÖRƏ, GƏLƏCƏKDƏ YENİ BİR QOVLUQ YARADANDA, HƏMİŞƏ BÖYÜK HƏRFLƏ BAŞLADIN.

**`RESAD_FILES/` qovluğu haqqında qeyd:** `src/`-in içində BƏLKƏ DƏ BELƏ ADLI BİR QOVLUQ GÖRƏ BİLƏRSİNİZ — BU, GİT TƏRƏFİNDƏN ARTIQ İZLƏNMİR (`.gitignore`-A ƏLAVƏ OLUNUB) VƏ TƏTBİQİN HEÇ BİR YERİNDƏN İMPORT OLUNMUR. İÇİNDƏKİ FAYLLARIN İMPORT YOLLARI BELƏ QIRIQDIR (MÖVCUD OLMAYAN BİR `@/types/Resad TYPESCRIPT_FILES/...` ALİASINA İŞARƏ EDİR) — YƏNİ BU QOVLUQ HƏTTA ÖZÜ-ÖZÜNƏ BELƏ COMPILE OLMUR. Bunu, gələcək bir referans üçün diskdə saxlanan, AMMA TƏTBİQİN REAL DAVRANIŞINA HEÇ BİR AİDİYYƏTİ OLMAYAN bir "arxiv" kimi düşünün — bu sənəddə DƏ, KODUN ÖZÜNDƏ DƏ, ONA HEÇ TOXUNULMUR.

### `src/assets/` — şəkillər, VƏ onların bir neçə dəfə "optimallaşdırılma" hekayəsi

**`src/assets/images/` — `login-img.webp`, `delete-img.webp`:** BU İKİ FAYL `Login/index.tsx`/`ConfirmModal.tsx`-DƏ `<img src={...}>` KİMİ BİRBAŞA İDXAL OLUNUR. **MARAQLI TAPINTI:** BU FAYLLAR ƏVVƏLCƏ `.svg` İDİ (FİQMA-DAN EXPORT OLUNMUŞDU), AMMA HƏQİQƏTDƏ **VEKTOR QRAFİKA DEYİLDİLƏR** — HƏR BİRİ, İÇİNDƏ BASE64 KODLANMIŞ BİR RASTER (PNG) ŞƏKLİ SAXLAYAN, TƏK BİR `<image>` TEQİNDƏN İBARƏT BİR "SARĞI" İDİ (FİQMA-NIN VEKTOR-OLMAYAN QATLARI BELƏ EXPORT ETMƏSİ TİPİK BİR SƏHVDİR). NƏTİCƏDƏ, BU FAYLLAR GZIP İLƏ PİS SIXILIRDI (~25%, ADİ SVG-LƏR İSƏ 80-90% SIXILIR) VƏ BÜTÜN BUILD-İN ƏN BÖYÜK FAYLLARI İDİ (404 KB / 124 KB — BÜTÜN JS BUNDLE-DAN BELƏ BÖYÜK). DÜZƏLİŞ: BASE64-Ü DEKODLAYIB HƏQİQİ PNG-YƏ ÇEVİRDİK, SONRA `.webp` FORMATINA (80% KEYFİYYƏTLƏ, `sharp-cli` İLƏ) ÇEVİRDİK — NƏTİCƏ: 21 KB / 24 KB (~95%/~80% AZALMA), VİZUAL OLARAQ FƏRQSİZ (BU İLLÜSTRASİYALAR DÜZ RƏNGLİDİR, FOTO DEYİL, ONA GÖRƏ LOSSY (İTKİLİ) WEBP-İN BURADA HEÇ BİR GÖRÜNƏN ZƏRƏRİ YOXDUR).

**`src/assets/icon/webico.png` — BUNDAN FAVICON (BRAUZER TAB İKONU) YARADILMASI:** Bu fayl, Tik Tak-ın loqosudur (677×369 piksel, "Tíktak" mətni + səbət qrafikası + "Tərəvəz Sifarişi" tagline-i ilə tam "lockup"). Layihə əvvəlcə Vite-in DEFAULT (heç bir aidiyyəti olmayan, generic bənövşəyi) `favicon.svg`-İNİ İŞLƏDİRDİ — bu, `webico.png`-DƏN HAZIRLANAN HƏQİQİ İKONLARLA ƏVƏZ OLUNDU:

```html
<!-- index.html -->
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
```
- **`public/` qovluğu haqqında qısa xatırlatma:** Vite, `public/`-in İÇİNDƏKİ HƏR ŞEYİ, HEÇ BİR DƏYİŞİKLİK ETMƏDƏN, SAYTIN KÖK ÜNVANINDAN (`/`) SERVİS EDİR — YƏNİ `public/favicon-32.png` BROWSER-Ə `/favicon-32.png` KİMİ ÇATIR. BU, `src/`-DƏN FƏRQLİDİR: `src/`-DƏKİ FAYLLAR YALNIZ KODDA `import`-LA İSTİFADƏ OLUNANDA BUNDLE-A DAXİL OLUR (VƏ ADLARI HASH İLƏ DƏYİŞİR), `public/`-DƏKİLƏR İSƏ HƏMİŞƏ, DƏYİŞMƏDƏN, EYNİ ADLA ORADADIR.
- **NİYƏ 4 AYRI FAYL, TƏK BİR FAYL YOX?** BRAUZER TAB-INDA GÖRÜNƏN FAVICON ÇOX KİÇİKDİR (16-48px) — BU ÖLÇÜLƏRDƏ, LOQONUN TAM MƏTNİ ("Tíktak", "Tərəvəz Sifarişi") OXUNMAZ BİR QARIŞIQLIĞA ÇEVRİLİR. ONA GÖRƏ, KİÇİK 3 ÖLÇÜ (`favicon-16/32/48.png`) ÜÇÜN, ŞƏKİL **YALNIZ SƏBƏT QRAFİKASINA** (MƏTNSİZ) "KƏSİLİB" (crop) — BÖYÜK `apple-touch-icon.png` (180px, TELEFONUN "ANA EKRANINA ƏLAVƏ ET" FUNKSİYASI ÜÇÜN) İSƏ TAM LOQONU (MƏTNLƏ BİRLİKDƏ) SAXLAYIR, ÇÜNKİ BU ÖLÇÜDƏ MƏTN HƏLƏ OXUNAQLIDIR.
- **NECƏ HAZIRLANDI (`sharp` KİTABXANASI İLƏ, BİR DƏFƏLİK SKRİPT):** (1) `trim()` — ŞƏKLİN ƏTRAFINDAKI BOŞ (AĞ/ŞƏFFAF) HAŞİYƏNİ AVTOMATİK KƏSİR (BU, MƏZMUNA TOXUNMUR, YALNIZ BOŞ SAHƏNİ TƏMİZLƏYİR). (2) KİÇİK ÖLÇÜLƏR ÜÇÜN, TRİM OLUNMUŞ ŞƏKLİN YALNIZ ORTA HİSSƏSİ (SƏBƏTİN OLDUĞU ŞAQULI ZOLAQ) `extract(...)` İLƏ AYRILIR, SONRA YENİDƏN `trim()` EDİLİR (SƏBƏTİN ÖZ SƏRHƏDLƏRİNƏ TIXLAMAQ ÜÇÜN). (3) NƏTİCƏ, ŞƏFFAF FON İLƏ KVADRAT BİR ÇƏRÇİVƏYƏ (`resize(side, side, { fit: 'contain', background: {r:0,g:0,b:0,alpha:0} })`) "DOLDURULUR" (Kİ, KVADRAT-OLMAYAN ŞƏKİL DEFORMASİYAYA UĞRAMASIN). (4) SON OLARAQ, HƏR HƏDƏF ÖLÇÜYƏ (16/32/48/180) `resize(...)` EDİLİB, SIXILMIŞ PNG (`compressionLevel: 9, palette: true`) KİMİ YAZILIR.
- **NƏTİCƏ ÖLÇÜLƏRİ:** ORİJİNAL `webico.png` 107 KB İDİ (VƏ HEÇ FAVICON KİMİ İSTİFADƏ OLUNMURDU) — İNDİ FAKTİKİ İSTİFADƏ OLUNAN FAVICON-LAR (16/32/48px) 1-2.6 KB ARASINDADIR, `apple-touch-icon.png` İSƏ 13 KB-DIR.
- **`webico.png`-İN ÖZÜ NƏ OLUR?** DİSKDƏ, `src/assets/icon/` QOVLUĞUNDA, DƏYİŞMƏDƏN QALIR — KODUN HEÇ BİR YERİNDƏN İDXAL OLUNMUR, SADƏCƏ MƏNBƏ FAYL (GƏLƏCƏKDƏ YENİ FAVICON-LAR HAZIRLAMAQ LAZIM GƏLSƏ, YENİDƏN BURADAN BAŞLANIR).

---

## Hissə 5: `src/types/` qovluğu

Bu qovluqda HEÇ BİR "İŞLƏYƏN" KOD YOXDUR (heç bir funksiya, heç bir komponent) — YALNIZ `interface`/`type` TƏRİFLƏRİ. Fikirləşin ki, bu, layihənin "LÜĞƏTİDİR": "Kateqoriya DEDİKDƏ NƏ NƏZƏRDƏ TUTULUR, HANSI SAHƏLƏRİ VAR" KİMİ SUALLARIN CAVABI BURADADIR.

**Niyə AYRICA bir qovluqda, məsələn `lib/adapters/`-ın İÇİNDƏ YOX?** Çünki EYNİ TİPƏ (məs. `CategoryApi`) HƏM `lib/adapters/category.ts`, HƏM DƏ `services/categoryService.ts` EHTİYAC DUYUR — İKİSİ DƏ BİR-BİRİNDƏN "TİP ÜÇÜN" ASILI OLMASIN DEYƏ, TİPLƏR NEYTRAL BİR YERƏ (`types/`) QOYULUB.

### `bir NÖV — bir fayl` qaydası (sonradan tətbiq olunan bir refactor)

**ƏVVƏLKİ VƏZİYYƏT:** Hər resurs ÜÇÜN TƏK BİR FAYL var idi — məs. `types/category.ts`, İÇİNDƏ 4 tip (`CategoryApi`, `Category`, `CategoryForm`, `CategoryPayload`) ARDICIL YAZILMIŞDI (27 sətir). **İNDİKİ VƏZİYYƏT:** hər `interface`/`type` ÖZ FAYLINDADIR — `types/category/CategoryApi.ts`, `types/category/Category.ts`, `types/category/CategoryForm.ts`, `types/category/CategoryPayload.ts`, ÜSTƏLİK ARTIQ İKİ YENİ TİP DƏ (`CategoryDetailsProps`, `CategoryFormProps` — komponentlərin PROP-LARI) ƏLAVƏ OLUNUB, VƏ hamısı `types/category/index.ts` ADLI BİR "BARREL" FAYLDAN, YENİDƏN-İXRAC (`export type { Category } from './Category'`) ŞƏKLİNDƏ, TOPLU BİR YERDƏ EDİLİR:
```ts
// types/category/index.ts
export type { CategoryApi } from './CategoryApi'
export type { Category } from './Category'
export type { CategoryForm } from './CategoryForm'
export type { CategoryPayload } from './CategoryPayload'
export type { CategoryDetailsProps } from './CategoryDetailsProps'
export type { CategoryFormProps } from './CategoryFormProps'
export type { CategoriesPaginationProps } from './CategoriesPaginationProps'
export type { CategoriesTableProps } from './CategoriesTableProps'
```
**BAŞQA FAYLLAR ÜÇÜN HEÇ NƏ DƏYİŞMİR** — `import type { Category, CategoryForm } from '@/types/category'` YAZILIŞI ƏVVƏLKİ İLƏ EYNİDİR (BARREL FAYL SAYƏSİNDƏ), YALNIZ `types/category/` QOVLUĞUNUN ÖZÜNÜN İÇİ dəyişib.

**NİYƏ BELƏ BÖLÜNDÜ?** Əsas səbəb, HƏR TİPİN ARTIQ ÖZ "İSTİFADƏÇİLƏRİ" olmasıdır: `CategoryDetailsProps`/`CategoryFormProps` kimi tiplər YALNIZ TƏK BİR KOMPONENTƏ aiddir (`CategoryDetails.tsx`/`CategoryForm.tsx`), `CategoryApi`/`CategoryPayload` isə YALNIZ `services/`+`lib/adapters/`-ə aiddir — bunları TƏK bir faylda saxlamaq, "bu tip haradan istifadə olunur?" sualını bir az da çətinləşdirirdi (bütün faylı oxumaq lazım gəlirdi ki, 8 tipdən HANSININ SİZİ MARAQLANDIRAN KOMPONENTƏ aid olduğunu tapasınız). Ayrı fayllarla, fayl ADININ ÖZÜ (`CategoryFormProps.ts`) artıq cavabdır.

**"BÖLMƏSƏYDİK NECƏ OLARDI?"** Köhnə tək-fayllı forma (`types/category.ts`, 4-8 tip birlikdə) KİÇİK layihələr üçün TAM MƏNTİQLİDİR — bu layihədə də, `types/common.ts`/`types/shared/` kimi, HƏLƏ DƏ ÇOX SAYDA KİÇİK, BİR-BİRİNƏ YAXIN TİPİ eyni qovluqda saxlayan yerlər var (sadəcə HƏR BİRİ ÖZ FAYLINDADIR, tək bir fayl deyil) — YƏNİ, BÖLÜNMƏ "hər tip öz faylında" SƏVİYYƏSİNDƏDİR, "hər NÖV RESURS öz qovluğunda" SƏVİYYƏSİNDƏ DEYİL (bu, artıq ƏVVƏLDƏN BELƏ İDİ). Alternativ olaraq, tiplər ORTA bir SƏVİYYƏDƏ DƏ QALA BİLƏRDİ (məs. "data tipləri" bir faylda, "prop tipləri" başqa bir faylda) — bu seçilməyib, çünki O ZAMAN HƏR YENİ PROP TİPİ ƏLAVƏ OLUNANDA YENƏ ARTIQ-BÖYÜYƏN BİR FAYLA GEDİLƏCƏKDİ; TƏK-TİP-TƏK-FAYL isə, layihə BÖYÜDÜKCƏ, HEÇ BİR FAYLIN ÖZÜ BÖYÜMƏMƏSİNİ (hamısı 5-15 sətir) TƏMİN EDİR.

### `types/shared/` — komponent PROP-larının YENİ EVİ

Əvvəllər, HƏR shared komponentin ÖZ `interface XProps {...}` TƏRİFİ, KOMPONENTİN ÖZ `.tsx` FAYLININ İÇİNDƏ İDİ (məs. `Button.tsx`-in başında `interface ButtonProps extends ComponentPropsWithRef<'button'> {...}`). İNDİ BUNLARIN HAMISI `types/shared/` QOVLUĞUNA (`ButtonProps.ts`, `TableProps.ts`, `ModalProps.ts` VƏ S. — HƏR BİRİ ÖZ FAYLINDA) ÇIXARILIB, KOMPONENT İSƏ SADƏCƏ ONU İDXAL EDİR:
```tsx
// ƏVVƏL (Button.tsx-in özündə):
interface ButtonProps extends ComponentPropsWithRef<'button'> { variant?: ...; icon?: ...; }
export default function Button({ variant = 'solid', ... }: ButtonProps) { ... }

// İNDİ:
import type { ButtonProps } from '@/types/shared'
export default function Button({ variant = 'solid', ... }: ButtonProps) { ... }
```
**NİYƏ?** Elə HƏMİN SƏBƏB — Hissə 5-in yuxarısındakı "bir NÖV — bir fayl" qaydası, YALNIZ `pages/`-in DEYİL, `shared/components/`-in DƏ ÜZƏRİNƏ TƏTBİQ OLUNUB, Kİ BÜTÜN LAYİHƏDƏ TİPLƏRİN "EVİ" HƏMİŞƏ EYNİ QAYDAYA TABE OLSUN (`types/`, İSTİSNASIZ). Əlavə praktik fayda: `types/shared/index.ts` bütün shared komponentlərin PROP formalarını BİR YERDƏ göstərir — YENİ bir komponent yazarkən, "prop tipini necə adlandırmalıyam, haraya qoymalıyam" sualı ARTIQ SUAL DEYİL (`{ComponentAdı}Props.ts`, `types/shared/`-də).

**"BÖLMƏSƏYDİK NECƏ OLARDI?"** Prop tipini komponentin ÖZ FAYLINDA saxlamaq (əvvəlki kimi) DA TAM DÜZGÜN bir yanaşmadır — bir çox React layihəsində BUNU tam etməzlər, çünki "komponent + onun prop-u" birlikdə oxunması TƏBİİ görünür. Bu layihədə köçürülməsinin səbəbi kod-SƏHVİ DEYİL, sırf KONVENSİYA VAHİDLİYİDİR (consistency): `types/` qovluğu "BÜTÜN tip tərifləri buradadır" qaydasını, İSTİSNASIZ, BÜTÜN layihəyə tətbiq etmək qərarı.

### Fayllar (məzmun etibarilə, əvvəlki kimi qalır — sadəcə fayl bölgüsü dəyişib)

- **`common/`** — BİRDƏN ÇOX YERDƏ İSTİFADƏ OLUNAN, KİÇİK, "ÜMUMİ" TİPLƏR (`BadgeColor.ts`, `Column.ts`, `IconComponent.ts`, `LayoutOutletContext.ts` — hər biri öz faylında, `index.ts` topluca yenidən ixrac edir):
```ts
export type BadgeColor = 'green' | 'blue' | 'amber' | 'purple' | 'red'
export interface Column { key: string; label: ReactNode; width?: number | string; align?: 'left' | 'center' | 'right' }
export type IconComponent = ComponentType<{ size?: number; color?: string }>
export interface LayoutOutletContext { search: string }
```
  - `BadgeColor` — `Badge` KOMPONENTİNİN `color` PROP-U, HƏM DƏ `ORDER_STATUS_BADGE_COLOR`/`productTypeBadgeColor`-UN QAYTARDIĞI DƏYƏR — HAMISI EYNİ 5 RƏNGDƏN BİRİ OLMALIDIR, ONA GÖRƏ TƏK BİR YERDƏ TƏYİN OLUNUB.
  - `Column` — `Table` KOMPONENTİNƏ VERİLƏN `columns` MASSİVİNİN HƏR ELEMENTİNİN FORMASI (Hissə 14-ə BAXIN). **YENİ sahə: `align?: 'left' | 'center' | 'right'`** — Orders-in `table/columns/columnMeta.ts`-i (Hissə 18-ə baxın) bəzi sütunları (məs. sıra nömrəsi) sola, digərlərini ortaya düzmək üçün əlavə edib; `Table.tsx` bunu `style={{ textAlign: col.align }}`-ə ötürür.
  - `IconComponent` — `Button` VƏ `StatCard`-IN `icon` PROP-U ÜÇÜN — "BU, `lucide-react`-DAN GƏLƏN BİR İKON KOMPONENTİDİR" DEMƏKDİR (`ComponentType<{...}>` — React-IN ÖZ TİPİ, "BU, BİR KOMPONENTDİR, BELƏ PROP-LAR QƏBUL EDİR" DEMƏKDİR).
  - `LayoutOutletContext` — `AdminLayout`-UN `Outlet`-Ə VERDİYİ, HƏR SƏHİFƏNİN `useOutletContext()` İLƏ OXUDUĞU OBYEKTİN FORMASI (Hissə 17-yə BAXIN).

- **`api/`** — AXİOS İLƏ ƏLAQƏLİ TİPLƏR (Hissə 9-DA, `axiosInstance.ts` İZAHINDA, BU FAYLIN HƏR SƏTRİ AYRICA GÖSTƏRİLİR).

- **`theme/`** — `Theme.ts` (`export type Theme = 'light' | 'dark'`) VƏ `ThemeState.ts` (`useThemeStore`-un state formasını təsvir edir) — Hissə 17-yə baxın.

- **`upload/`** — `UploadResponse.ts` (`uploadService.ts`-in qaytardığı, yüklənmiş faylın URL-ini saxlayan cavab forması).

- **`auth/`** — GİRİŞ/PROFİL İLƏ ƏLAQƏLİ TİPLƏR (`AuthState.ts`, `AuthTokens.ts`, `LoginPayload.ts`, `LoginResponse.ts`, `Profile.ts`, `LoginFormValues.ts`, `LoginPhoneFieldProps.ts`, `LoginPasswordFieldProps.ts`):
```ts
export interface Profile {
  id: number
  full_name: string
  phone: string
  address: string | null
  img_url: string | null
  role: string
  created_at: string
}
export interface AuthTokens { access_token: string; refresh_token: string }
export interface LoginPayload { phone: string; password: string }
export interface LoginResponse { tokens: AuthTokens; profile: Profile }
export interface LoginFormValues { phone: string; password: string }
export interface LoginPhoneFieldProps { register: UseFormRegister<LoginFormValues> }
export interface LoginPasswordFieldProps {
  register: UseFormRegister<LoginFormValues>
  showPassword: boolean
  onToggle: () => void
}
```
  `string | null` — "BU SAHƏ YA STRİNGDİR, YA DA `null`" (Hissə 3-DƏKİ UNION-A BAXIN) — MƏSƏLƏN `address`, İSTİFADƏÇİ ÜNVAN GİRMƏYİBSƏ, BACKEND-DƏN `null` OLARAQ GƏLİR (BOŞ STRİNG YOX).
  **`LoginFormValues` `LoginPayload` İLƏ EYNİ GÖRÜNÜR, AMMA FƏRQLİ MƏQSƏDƏ XİDMƏT EDİR** — `LoginPayload` BACKEND-Ə GEDƏN SORĞUNUN FORMASIDIR (`authService.ts`), `LoginFormValues` İSƏ `Login` SƏHİFƏSİNİN ÖZ `react-hook-form`-UNUN STATE FORMASIDIR (Hissə 18-in Login bölməsinə baxın) — HAZIRDA İKİSİ EYNİ SAHƏLƏRƏ SAHİBDİR, AMMA BİR-BİRİNDƏN ASILI DEYİL (BİRİ DƏYİŞSƏ, O BİRİ AVTOMATİK DƏYİŞMİR), ONA GÖRƏ AYRI SAXLANIB. `LoginPhoneFieldProps`/`LoginPasswordFieldProps`-DAKI `UseFormRegister<LoginFormValues>` — react-hook-form-un ÖZ TİPİDİR, "`LoginFormValues`-in HANSI SAHƏSİNİ QEYDƏ ALA BİLƏRSƏN" MƏNASINI DAŞIYIR (Hissə 18-Ə BAXIN).

- **`category/`, `campaign/`, `product/`, `order/`, `user/`** — HƏR RESURS ÜÇÜN, ÖZ QOVLUĞUNDA, EYNİ 4 ƏSAS TİPDƏN İBARƏT BİR "DƏST" (+ SƏHİFƏNİN KOMPONENT PROP-LARI, MƏS. `CategoryFormProps`, `CategoriesTableProps` — Hissə 18-ə baxın):
  1. **`XApi`** — BACKEND-DƏN GƏLƏN XAM FORMA (`img_url`, `created_at` KİMİ snake_case SAHƏLƏR, `docs/API.md`-DƏKİ İLƏ BİRƏBİR EYNİ).
  2. **`X`** — UI-NİN İSTİFADƏ ETDİYİ FORMA (`imageUrl`, `date` KİMİ camelCase — `mapXFromApi` FUNKSİYASININ QAYTARDIĞI FORMA).
  3. **`XForm`** — BİR `<Modal>` FORMASININ STATE-DƏ SAXLADIĞI FORMA (ADƏTƏN `X`-Ə OXŞAYIR, AMMA BƏZƏN FƏRQLİDİR — AŞAĞIDA `ProductForm` MİSALI VAR).
  4. **`XPayload`** — SERVERƏ YARATMA/YENİLƏMƏDƏ GÖNDƏRİLƏN FORMA (`mapXToApi`-NİN QAYTARDIĞI, ADƏTƏN `id`/`created_at` KİMİ "SERVERİN ÖZÜ YARATDIĞI" SAHƏLƏR OLMADAN).

  `Order` QOVLUĞUNDA, ƏLAVƏ OLARAQ, CƏDVƏLİN SIRALAMA/FİLTRASİYA MƏNTİQİNƏ AİD BİR NEÇƏ KİÇİK TİP DƏ VAR (`SortKey`, `SortState`, `CountBucket`, `ShippingBucket`, `ColumnHeaderProps`, `DateColumnHeaderProps` VƏ S.) — BUNLAR HEÇ BİR BAŞQA SƏHİFƏYƏ AİD DEYİL, ONA GÖRƏ `types/order/`-DƏ, YALNIZ `Orders` SƏHİFƏSİNİN ÖZÜNÜN İSTİFADƏ ETDİYİ TİPLƏR KİMİ YAŞAYIR (Hissə 18-Ə BAXIN).

**Misal — `types/product/` (ƏN MÜRƏKKƏB OLANI — BURADA, OXUNUŞ ÜÇÜN, HAMISI TƏK BLOKDA GÖSTƏRİLİR, ƏSLİNDƏ HƏR `interface` ÖZ FAYLINDADIR: `ProductCategoryShort.ts`, `ProductApi.ts`, `Product.ts`, `ProductForm.ts`, `ProductPayload.ts`):**
```ts
import type { ProductType } from '@/lib/constants/productTypes'

export interface ProductCategoryShort {
  id: number
  name: string
}

export interface ProductApi {
  id: number
  title: string
  description: string
  price: string
  type: ProductType
  img_url: string
  category: ProductCategoryShort | null
  created_at: string
}

export interface Product {
  id: number
  image: string
  color: string
  imageUrl: string
  name: string
  description: string
  price: string
  type: ProductType
  category: ProductCategoryShort | null
  category_id: number | ''
  date: string
}

export interface ProductForm {
  image: string
  color: string
  imageUrl: string
  name: string
  description: string
  price: string
  // başlanğıcda `number | ''` olur (openCreate bir Product-un category_id-sindən "toxum" götürür),
  // amma <select>-in onChange-i HƏMİŞƏ sadə bir string qaytarır — hər çağırış yerində "as" yazmaq
  // əvəzinə, tipin özü hər ikisini əhatə edəcək qədər genişləndirilib.
  category_id: number | string
  type: ProductType
}

export interface ProductPayload {
  title: string
  description: string
  price: string
  type: ProductType
  img_url: string
  category_id: number
}
```
**BURADA DİQQƏTƏLAYİQ NÖQTƏ:** `Product.category_id: number | ''` İLƏ `ProductForm.category_id: number | string` **FƏRQLİDİR** — BU, TƏSADÜF DEYİL, HƏQİQİ BİR SƏBƏBƏ ƏSASLANIR: `Product` (SİYAHI ELEMENTİ) HƏMİŞƏ `mapProductFromApi`-DƏN GƏLİR, ORADA `category_id` YA RƏQƏMDİR, YA DA (KATEQORİYA YOXDURSA) BOŞ STRİNG `''`. AMMA `ProductForm` (FORMANIN ÖZÜ), İSTİFADƏÇİ `<select>` DROPDOWN-DAN BİR KATEQORİYA SEÇƏNDƏ, HTML-İN ÖZ QAYDASINA GÖRƏ HƏMİŞƏ **SADƏ BİR STRİNG** ALIR (HƏTTA O STRİNG "5" KİMİ RƏQƏMƏ OXŞASA BELƏ) — ONA GÖRƏ FORMANIN TİPİ BUNU DA ƏHATƏ ETMƏLİDİR. **BU, TYPESCRIPT-İN MİQRASİYA ZAMANI TAPDIĞI HƏQİQİ BİR UYĞUNSUZLUQ İDİ** — YƏNİ TYPESCRIPT SADƏCƏ "NƏZƏRİ" BİR MİSAL DEYİL, DOĞRUDAN DA KODUN İÇİNDƏKİ İNCƏ BİR FƏRQİ ÜZƏ ÇIXARDI.

- **HƏR RESURS QOVLUĞUNUN ÖZ `index.ts`-i** — O QOVLUQDAKI BÜTÜN FAYLLARDAN, YALNIZ TİPLƏRİ (`export type { ... } from './...'` ŞƏKLİNDƏ) TOPLAYAN "BARREL" (SƏBƏT) FAYLI (yuxarıda `types/category/index.ts` MİSALINA BAXIN). BUNDAN ƏLAVƏ, KÖK SƏVİYYƏDƏ (`types/index.ts`) DA BİR BARREL VAR — O DA, ÖZ NÖVBƏSİNDƏ, HƏR ALT-QOVLUĞUN ÖZ `index.ts`-İNİ YENİDƏN İXRAC EDİR (İKİ QATLI BARREL). Səhifələr, RAHATLIQ ÜÇÜN, TEZ-TEZ KÖK BARREL-DAN İDXAL EDİR (`import type { Category, Product } from '@/types'`); `lib/adapters/`/`services/` İSƏ HƏR DƏFƏ KONKRET RESURS QOVLUĞUNDAN İDXAL EDİR (`import type { Category } from '@/types/category'`) — ÇÜNKİ BU FAYLLAR YALNIZ BİR RESURSA AİDDİR, KÖK BARREL-DƏN İDXAL ETMƏYİN ƏLAVƏ FAYDASI YOXDUR.

**Enum-lar (`OrderStatus`, `ProductType`, `UserRole`) NİYƏ BU QOVLUQDA "TƏYİN" OLUNMUR?** Çünki ONLAR ARTIQ `lib/constants/orderStatus.ts`/`productTypes.ts`/`userRole.ts`-DƏ, `keyof typeof` TRİKİ İLƏ (Hissə 3-Ə BAXIN) MÖVCUDDUR — `types/order/`/`product/`/`user/` ONLARI SADƏCƏ **YENİDƏN İXRAC EDİR** (`export type { OrderStatus } from '@/lib/constants/orderStatus'`), TƏKRAR YAZMIR. Bu, "TƏK MƏNBƏ" (single source of truth) PRİNSİPİDİR — STATUS SİYAHISI DƏYİŞƏNDƏ, YALNIZ BİR YERİ (`lib/constants/`) DƏYİŞMƏK KİFAYƏTDİR.

**`types/user/`-DƏKİ `UserRole` — SONRADAN ƏLAVƏ OLUNAN BİR TƏKMİLLƏŞDİRMƏ:**
```ts
import type { UserRole } from '@/lib/constants/userRole'

export interface UserApi {
  id: number
  full_name: string
  phone: string
  address: string | null
  img_url: string | null
  role: UserRole
  created_at: string
}

export interface User {
  id: number
  initial: string
  color: string
  name: string
  phone: string
  address: string
  role: UserRole
}

export type { UserRole }
```
BAŞLANĞICDA `role` SAHƏSİ SADƏCƏ `string` İDİ (İSTƏNİLƏN MƏTN OLA BİLƏRDİ) — AMMA BACKEND HƏQİQƏTDƏ YALNIZ İKİ DƏYƏR QAYTARIR: `"ADMIN"` VƏ `"COMMERCE"`. Bu, `OrderStatus`/`ProductType` İLƏ EYNİ NÖV BİR "BOŞLUQ" İDİ (Hissə 3-DƏKİ `keyof typeof`-A BAXIN) — ONA GÖRƏ EYNİ PATTERN TƏTBİQ OLUNARAQ, `role: string` → `role: UserRole` EDİLDİ (Hissə 11-DƏ, `userRole.ts`-DƏ ƏTRAFLI GÖRƏCƏYİK).

**`types/order/`-Ə SONRADAN ƏLAVƏ OLUNAN `createdAt` SAHƏSİ:**
```ts
export interface Order {
  id: number
  orderNumber: string
  date: string
  // raw ISO timestamp, kept alongside the formatted `date` display string
  // specifically so Orders.tsx can sort chronologically — `date` (dd.mm.yyyy)
  // does not sort correctly as a plain string.
  createdAt: string
  address: string
  // ... (qalan sahələr dəyişməyib)
}
```
**NİYƏ HƏM `date`, HƏM DƏ `createdAt`?** `date` — GÖSTƏRİLƏN, İNSANIN OXUYA BİLƏCƏYİ FORMATDIR (`"26.07.2026"`, `formatDate(...)` FUNKSİYASININ NƏTİCƏSİ). SİFARİŞLƏR CƏDVƏLİNDƏ TARİXƏ GÖRƏ SIRALAMA (Hissə 18-Ə BAXIN) ƏLAVƏ EDİLƏNDƏ, BİR PROBLEM AŞKAR OLDU: İKİ `"dd.mm.yyyy"` STRİNGİNİ SADƏ MƏTN KİMİ MÜQAYİSƏ ETSƏNİZ (MƏS. `"05.01.2026" < "26.07.2025"`), NƏTİCƏ SƏHV OLUR — ÇÜNKİ STRİNG MÜQAYİSƏSİ SOLDAN SAĞA, HƏRF-HƏRF GEDİR, İLK RƏQƏM (GÜN) ÜSTÜNLÜK TƏŞKİL EDİR, İL DEYİL. ONA GÖRƏ, `date`-Ə TOXUNMADAN, YANINA API-DƏN GƏLƏN XAM ISO TARİXİ (`createdAt`, MƏS. `"2026-07-26T05:37:56.753Z"`) DƏ SAXLANILIR — BU FORMAT ƏLİFBA SIRASI İLƏ MÜQAYİSƏ EDİLƏNDƏ DƏ DÜZGÜN XRONOLOJİ NƏTİCƏ VERİR (ÇÜNKİ İL ƏVVƏLDƏDİR), ONA GÖRƏ SIRALAMA ÜÇÜN MƏHZ BUNDAN İSTİFADƏ OLUNUR.

---

## Hissə 6: Giriş nöqtəsi

### `src/app/main.tsx`

Bu, tətbiqin **HƏR ŞEYDƏN ƏVVƏL** işə düşən faylıdır — `index.html` faylı birbaşa bunu `<script>` ilə çağırır.

```tsx
import { createRoot } from 'react-dom/client'
import '@/index.css'
import ErrorBoundary from '@/shared/components/ErrorBoundary'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
)
```

**Sətir-sətir:**
1. `createRoot` — React-ın DOM-a (brauzerin göstərdiyi HTML ağacına) "bağlanmaq" üçün funksiyası.
2. `import '@/index.css'` — bütün qlobal CSS-i (rəng dəyişənləri, font, reset qaydaları) bir dəfə yükləyir. `from` yoxdur çünki bu faylın heç nəyini "adla" gətirmirik, sadəcə CSS-i işə salırıq.
3. `ErrorBoundary` — aşağıda ətraflı izah olunan xüsusi komponent, tətbiqin İSTƏNİLƏN yerində JavaScript xətası baş versə, bütün ekranı "ağappaq boş" etmək əvəzinə səliqəli bir xəta ekranı göstərir.
4. `App` — `./App`-dən (eyni qovluqdan, ona görə `@/` yox, `./` işlədilib) gətirilir. **DİQQƏT:** əvvəllər (JS versiyasında) `'./App.jsx'` YAZILIRDI (fayl uzantısı İLƏ), İNDİ İSƏ SADƏCƏ `'./App'` — TypeScript-lə işləyəndə, uzantını (`.tsx`) YAZMIRIQ, Vite ÖZÜ TAPIR.
5. `document.getElementById('root')` — `index.html`-dəki `<div id="root"></div>` elementini tapır — React BÜTÜN tətbiqi bunun İÇİNƏ "yerləşdirəcək". **`!` işarəsinə diqqət** — bu, TypeScript-in "NON-NULL ASSERTION" (`Hissə 3`-dəki `as`-a BƏNZƏR bir "buna ETİBAR ET" işarəsidir): `getElementById(...)` NƏZƏRİ olaraq `null` DA qaytara bilər (element tapılmasa), AMMA BİZ BİLİRİK Kİ, `index.html`-də BU `<div>` HƏMİŞƏ VAR — `!` İLƏ TypeScript-ə "BU DƏYƏR `null` DEYİL, BUNA ETİBAR ET" DEYİRİK.
6. `createRoot(...).render(...)` — tapılan `<div>`-in içinə `<ErrorBoundary><App/></ErrorBoundary>`-ni RENDER edir (ekrana çıxarır).

**Niyə `<StrictMode>` yoxdur?** React-ın default şablonunda adətən `<StrictMode>` olur (development zamanı bəzi funksiyaları TƏSADÜFƏN İKİ DƏFƏ işə salıb səhvləri tez tapmağa kömək edir). Bu layihədə bilərəkdən çıxarılıb — sadəlik üçün.

**Niyə `ErrorBoundary` `App`-ın İÇİNDƏ deyil, ÇÖLÜNDƏ?** Çünki `App.tsx`-in özündə də (məsələn provider-lərin qurulmasında) nəzəri cəhətdən xəta ola bilər — `ErrorBoundary` ən XARİCDƏ olsa, HƏR ŞEYİ (App-ın özü daxil) əhatə edir.

### `src/app/App.tsx`

```tsx
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { queryClient } from '@/lib/queryClient'
import AppRoutes from '@/routes/AppRoutes'

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRoutes />
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </QueryClientProvider>
  )
}
```

**Sətir-sətir:**
1. `BrowserRouter` — react-router-dom-un əsas "sarğı" komponentidir, brauzerin ünvan çubuğunu izləyib React-a bildirir.
2. `QueryClientProvider` — TanStack Query-ni bütün tətbiqə "tanıtmaq" üçün. Bunun `client` prop-una `queryClient` (aşağıda izah olunan konfiqurasiya obyekti) verilir. Bu olmadan heç bir səhifədə `useQuery`/`useMutation` işləməz.
3. `Toaster` — sonner kitabxanasının bildiriş qutucuqlarını EKRANA ÇIXARAN komponent. `position="top-right"` — sağ yuxarı küncdə çıxsın. `richColors` — uğur/xəta üçün rəngli (yaşıl/qırmızı) fon versin.
4. **Diqqət**: `<AppRoutes/>` və `<Toaster/>` `<BrowserRouter>`-in İÇİNDƏDİR, amma bir-birinin QARDAŞIdır (biri digərinin içində deyil) — ikisi də eyni səviyyədə, yan-yana render olunur.

Bu faylda (VƏ ÇOX SAYDA BAŞQA FAYLDA) HEÇ BİR `: TipAdı` GÖRMÜRSÜNÜZSƏ, TƏƏCCÜBLƏNMƏYİN — `App` KOMPONENTİNİN PARAMETRİ (PROP-U) YOXDUR, TypeScript BURADA ƏLAVƏ TİP YAZILMASINA EHTİYAC DUYMUR, ÇÜNKİ HƏR ŞEY (QAYTARILAN JSX DAXİL) AVTOMATİK OLARAQ DOĞRU TİPDƏ "İNFER" OLUNUR (Hissə 3-DƏKİ "TİP İNFERENCE"-Ə BAXIN). **TypeScript, HƏR YERDƏ AÇIQ-AŞKAR TİP YAZMAĞI TƏLƏB ETMİR — YALNIZ TİPİ ÖZÜ "TAPA BİLMƏDİYİ" YERLƏRDƏ (MƏS. FUNKSİYA PARAMETRLƏRİ) YAZILIR.**

---

## Hissə 7: Routing

### `src/routes/AppRoutes.tsx`

```tsx
import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import RequireAuth from '@/routes/RequireAuth'
import RedirectIfAuth from '@/routes/RedirectIfAuth'
import AdminLayout from '@/layouts/AdminLayout'
import Loading from '@/shared/components/Loading'

const Login = lazy(() => import('@/pages/Login'))
const NotFound = lazy(() => import('@/pages/NotFound'))
const Orders = lazy(() => import('@/pages/Protected/Orders'))
const Campaigns = lazy(() => import('@/pages/Protected/Campaigns'))
const Categories = lazy(() => import('@/pages/Protected/Categories'))
const Products = lazy(() => import('@/pages/Protected/Products'))
const Users = lazy(() => import('@/pages/Protected/Users'))

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loading fullScreen />}>
      <Routes>
        <Route
          path="/login"
          element={
            <RedirectIfAuth>
              <Login />
            </RedirectIfAuth>
          }
        />
        <Route element={<RequireAuth />}>
          <Route element={<AdminLayout />}>
            <Route path="/sifarisler" element={<Orders />} />
            <Route path="/kampaniyalar" element={<Campaigns />} />
            <Route path="/kateqoriyalar" element={<Categories />} />
            <Route path="/mehsullar" element={<Products />} />
            <Route path="/istifadeciler" element={<Users />} />
          </Route>
        </Route>
        <Route path="/" element={<Navigate to="/sifarisler" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}
```

**Nə üçün `lazy(() => import(...))`?** Normal `import Login from '...'` DƏRHAL, tətbiq açılan kimi o faylın kodunu yükləyir — hətta istifadəçi `/login`-ə heç getməsə belə. `lazy()` isə "bu komponentin kodunu YALNIZ LAZIM OLANDA (həmin route-a keçiləndə) yüklə" deyir. Nəticədə hər səhifə öz kiçik JS faylı (chunk) kimi ayrılır, ilk yükləmə daha sürətli olur. Bu sətirdə TypeScript-ə aid HEÇ NƏ YOXDUR (bu, TAM React-in ÖZ mexanizmidir) — AMMA maraqlıdır Kİ, `lazy(() => import('@/pages/Login'))` YAZANDA, TypeScript ARTIQ BİLİR Kİ, `Login` KOMPONENTİ NECƏ İSTİFADƏ OLUNMALIDIR (PROP-LARI VƏ S.) — ÇÜNKİ O FAYLIN ÖZÜNDƏKİ TİPLƏRİ "İZLƏYİR", HƏTTA KOD HƏLƏ YÜKLƏNMƏSƏ BELƏ.

**`Suspense` nədir?** `lazy()` ilə yüklənən komponentin kodu HƏLƏ GƏLMƏYİBSƏ (yüklənməsi bir neçə millisaniyə çəkə bilər), React nə göstərəcəyini bilmir — buna görə `<Suspense fallback={...}>` "bu komponent hazır olana qədər `fallback`-ı göstər" deyir. Burda `fallback={<Loading fullScreen/>}` — bütün ekranı ortalanmış spinner tutur.

**Sətir-sətir marşrut ağacı:**
- `<Route path="/login" element={<RedirectIfAuth><Login/></RedirectIfAuth>} />` — `/login` ünvanına gedəndə, əvvəlcə `RedirectIfAuth` yoxlayır (aşağıda izah), sonra `Login`-i göstərir.
- `<Route element={<RequireAuth/>}>` — bu, "layout route"-dur, öz `path`-ı yoxdur, sadəcə İÇİNDƏKİ bütün route-ları `RequireAuth` yoxlamasından keçirir (login olmayıbsa, heç birinə keçid vermir).
- Onun İÇİNDƏ daha bir `<Route element={<AdminLayout/>}>` var — bu da eyni məntiqlə, İÇİNDƏKİ 5 səhifəni `AdminLayout`-un (sidebar+header) İÇİNƏ "yerləşdirir" (aşağıda `<Outlet/>` ilə izah olunur).
- `<Route path="/" element={<Navigate to="/sifarisler" replace/>} />` — kimsə sadəcə sayt adının kök ünvanına (`/`) girsə, avtomatik `/sifarisler`-ə YÖNLƏNDİRİLİR. `replace` — brauzerin "geri" düyməsi bu addımı ATLAYIR (tarixçəyə əlavə olunmur).
- `<Route path="*" element={<NotFound/>} />` — `*` "başqa HEÇ NƏYƏ uymayan İSTƏNİLƏN yol" deməkdir — yəni tanış olmayan bir URL yazılsa, 404 səhifəsi göstərilir.

### `src/routes/RequireAuth.tsx`

```tsx
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'

export default function RequireAuth() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}
```

**Sətir-sətir:**
1. `useAuthStore((s) => s.isAuthenticated)` — zustand store-dan YALNIZ `isAuthenticated` sahəsini "seçib" alır (aşağıda zustand-ı ətraflı izah edəcəyik). `(s) => s.isAuthenticated` bir "selector" funksiyasıdır — "store-un tam vəziyyətindən (`s`) mənə YALNIZ bu sahəni ver" deməkdir. **TİP baxımından:** `s` PARAMETRİNİN NÖVÜ (`AuthState`, Hissə 8-DƏ GÖRƏCƏYİK) TypeScript TƏRƏFİNDƏN AVTOMATİK "İNFER" OLUNUR (Hissə 3-Ə BAXIN) — ÇÜNKİ `useAuthStore`-UN ÖZÜ `create<AuthState>()` İLƏ YARADILIB, ONA GÖRƏ TypeScript ARTIQ BİLİR Kİ, `s.isAuthenticated` MÖVCUDDUR VƏ `boolean`-DIR.
2. `isAuthenticated ? <Outlet/> : <Navigate to="/login" replace/>` — ternar operator ilə: login olubsa `<Outlet/>` göstər, olmayıbsa `/login`-ə göndər.
3. **`<Outlet/>` nədir?** react-router-dom-un xüsusi komponentidir — "burada, bu layout route-un İÇİNDƏKİ konkret route (uşaq route) render olunmalıdır" yer tutucusudur. `AppRoutes.tsx`-də `<Route element={<RequireAuth/>}>`-nin İÇİNDƏKİ hər route (`/sifarisler`, `/kampaniyalar` və s.) məhz bu `<Outlet/>`-in yerinə "yerləşdirilir".

### `src/routes/RedirectIfAuth.tsx`

```tsx
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import type { RedirectIfAuthProps } from '@/types/shared'

export default function RedirectIfAuth({ children }: RedirectIfAuthProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  return isAuthenticated ? <Navigate to="/sifarisler" replace /> : children
}
```

`RequireAuth`-ın TƏRSİDİR: artıq login OLMUŞ bir istifadəçi `/login`-ə girməyə cəhd etsə, ona login formasını göstərmək əvəzinə birbaşa `/sifarisler`-ə yönləndirir. **`interface RedirectIfAuthProps { children: ReactNode }` ARTIQ BU FAYLDA DEYİL** — Hissə 5-dəki `types/shared/`-ə keçidlə eyni səbəbdən, `types/shared/RedirectIfAuthProps.ts`-dədir. `children: ReactNode` — HƏR HANSI RENDER OLUNA BİLƏN ŞEY (BİR KOMPONENT, MƏTN, MASSİV VƏ S. — `ReactNode`, React-IN ÖZ TİPİDİR, "İSTƏNİLƏN RENDER OLUNA BİLƏN ŞEY" DEMƏKDİR). `<RedirectIfAuth><Login/></RedirectIfAuth>` yazanda, `<Login/>` elementi `children` kimi ötürülür, biz onu login olmayanda sadəcə geri qaytarırıq (`: children`).

---

## Hissə 8: Auth

### `src/lib/auth/session.ts`

Bu fayl, giriş məlumatlarını (token-lər, profil) brauzerin **`localStorage`**-ında saxlayır. `localStorage` — brauzerin diskində saxlanan, səhifə bağlanıb-açılsa belə İTMƏYƏN açar-dəyər (key-value) yaddaşıdır.

```ts
import type { AuthTokens, LoginResponse, Profile } from '@/types/auth'

const ACCESS_KEY = 'tiktak_admin_access_token'
const REFRESH_KEY = 'tiktak_admin_refresh_token'
const PROFILE_KEY = 'tiktak_admin_profile'

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_KEY)
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_KEY)
}

export function getStoredProfile(): Profile | null {
  const raw = localStorage.getItem(PROFILE_KEY)
  return raw ? (JSON.parse(raw) as Profile) : null
}

export function saveSession({ tokens, profile }: LoginResponse): void {
  localStorage.setItem(ACCESS_KEY, tokens.access_token)
  localStorage.setItem(REFRESH_KEY, tokens.refresh_token)
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
}

export function saveTokens(tokens: AuthTokens): void {
  localStorage.setItem(ACCESS_KEY, tokens.access_token)
  localStorage.setItem(REFRESH_KEY, tokens.refresh_token)
}

export function clearSession(): void {
  localStorage.removeItem(ACCESS_KEY)
  localStorage.removeItem(REFRESH_KEY)
  localStorage.removeItem(PROFILE_KEY)
}
```

**Sətir-sətir (VƏ HƏR YERDƏ ƏLAVƏ OLUNAN TİPLƏR):**
1. `import type { AuthTokens, LoginResponse, Profile } from '@/types/auth'` — Hissə 5-DƏ TƏYİN OLUNAN ÜÇ TİPİ GƏTİRİR. `import type` (`import` YOX) YAZILIB, ÇÜNKİ BUNLAR YALNIZ TİPDİR, RUNTIME-DA HEÇ BİR "DƏYƏR" DEYİL (Hissə 3-Ə BAXIN).
2-4. Üç sabit — `localStorage`-da istifadə ediləcək "açar adları". TypeScript BUNLARIN `string` OLDUĞUNU ÖZÜ "İNFER" EDİR, ƏLAVƏ YAZILMASINA EHTİYAC YOXDUR.
6-8. `getAccessToken(): string | null` — FUNKSİYA ADINDAN SONRAKI `: string | null` — **QAYTARILAN DƏYƏRİN TİPİDİR** (Hissə 3-DƏKİ UNION-A BAXIN): "BU FUNKSİYA YA STRİNG, YA DA `null` QAYTARIR" (`localStorage.getItem(...)`-in ÖZÜNÜN TİPİ MƏHZ BUDUR — TAPILMASA `null`).
10-12. `getRefreshToken()` — eynilə, refresh token üçün.
14-17. `getStoredProfile(): Profile | null` — `localStorage` HƏMİŞƏ **string** saxlayır, obyekt yox. Ona görə profil `JSON.stringify()` ilə YAZILIB, oxuyanda `JSON.parse()` ilə GERİ obyektə çevrilir. `JSON.parse(raw) as Profile` — Hissə 3-DƏ İZAH OLUNAN `as` ASSERSİYASI: `JSON.parse` ÖZÜ "İSTƏNİLƏN ŞEY" (`any`, TypeScript-in DAXİLİ QAYDASINA GÖRƏ) QAYTARIR, BİZ `as Profile` İLƏ "BUNA ETİBAR ET, `Profile` FORMASINDADIR" DEYİRİK (ÇÜNKİ YALNIZ `saveSession` FUNKSİYASI BU AÇARA YAZIR, VƏ O DA MƏHZ `Profile` FORMASINDA YAZIR).
19-23. `saveSession({ tokens, profile }: LoginResponse): void` — PARAMETR DESTRUCTURE OLUNUB (Hissə 2), TİPİ İSƏ `LoginResponse` (`{tokens: AuthTokens, profile: Profile}` FORMASINDA, Hissə 5-Ə BAXIN). `: void` — "BU FUNKSİYA HEÇ NƏ QAYTARMIR" (Hissə 3-DƏKİ `void`-Ə BAXIN). Login uğurlu olanda ÇAĞIRILIR, hər üç dəyəri `localStorage`-a yazır.
25-28. `saveTokens(tokens: AuthTokens): void` — YALNIZ token-ləri yeniləmək üçün (profil dəyişmir) — token "refresh" olunanda istifadə olunur (aşağıda `axiosInstance.ts`-də).
30-34. `clearSession(): void` — logout-da bütün üç açarı `localStorage`-dan SİLİR.

### `src/store/useAuthStore.ts`

Bu, **zustand** ilə qurulmuş "qlobal state"dir. Zustand-ı belə düşünün: `useState` yalnız BİR komponentin daxilində yaşayır, komponent yox olanda dəyər də itir. Zustand store isə tətbiqin İSTƏNİLƏN yerindən əlçatandır və HƏMİŞƏ yaddadır (səhifə naviqasiyası zamanı sıfırlanmır).

```ts
import { create } from 'zustand'
import { loginAdmin } from '@/services/authService'
import { getAccessToken, getStoredProfile, saveSession, clearSession } from '@/lib/auth/session'
import type { AuthState } from '@/types/auth'

export const useAuthStore = create<AuthState>((set) => ({
  profile: getStoredProfile(),
  isAuthenticated: !!getAccessToken(),

  login: async (phone, password) => {
    const data = await loginAdmin({ phone, password })
    saveSession(data)
    set({ profile: data.profile, isAuthenticated: true })
  },

  logout: () => {
    clearSession()
    set({ profile: null, isAuthenticated: false })
  },
}))

window.addEventListener('storage', () => {
  useAuthStore.setState({
    isAuthenticated: !!getAccessToken(),
    profile: getStoredProfile(),
  })
})
```

**Sətir-sətir:**
1. `create` — zustand-ın store yaradan funksiyası.
6-11. **`import type { AuthState } from '@/types/auth'`** — BU TİP ƏVVƏLLƏR (JS-DƏN TypeScript-ə keçəndə) BU FAYLIN ÖZÜNDƏ, `interface AuthState {...}` OLARAQ TƏYİN OLUNMUŞDU; İNDİ İSƏ, Hissə 5-dəki `types/shared/`-ə keçidlə EYNİ SƏBƏBDƏN (bütün komponent/store "state forması" tipləri `types/`-ə köçürülür), `types/auth/AuthState.ts`-DƏDİR — STORE-UN DƏQİQ HANSI SAHƏLƏRƏ VƏ FUNKSİYALARA MALİK OLDUĞUNU O FAYLDA TƏSVİR EDİR:
```ts
// types/auth/AuthState.ts
export interface AuthState {
  profile: Profile | null
  isAuthenticated: boolean
  login: (phone: string, password: string) => Promise<void>
  logout: () => void
}
```
   - `profile: Profile | null` — YA `Profile` FORMASINDA OBYEKT, YA DA (LOGIN OLUNMAYIBSA) `null`.
   - `isAuthenticated: boolean` — true/false.
   - `login: (phone: string, password: string) => Promise<void>` — Hissə 3-DƏKİ "FUNKSİYA TİPİ": "BU, İKİ STRİNG PARAMETRİ ALAN, VƏ `Promise<void>` QAYTARAN BİR FUNKSİYADIR" DEMƏKDİR. `Promise<void>` — "BU FUNKSİYA `async`-DIR (Hissə 2-Ə BAXIN), NƏTİCƏSİNİ GÖZLƏMƏK OLAR (`await`), AMMA HEÇ BİR DƏYƏR QAYTARMIR" (`void`, YUXARIDA İZAH OLUNDU) DEMƏKDİR.
   - `logout: () => void` — PARAMETRSİZ, HEÇ NƏ QAYTARMAYAN FUNKSİYA.
13. `create<AuthState>((set) => ({ ... }))` — **`<AuthState>`** BURADA, Hissə 3-DƏ İZAH OLUNAN GENERİK SİNTAKSİSDİR: `create` FUNKSİYASINA "BU STORE-UN FORMASI DƏQİQ `AuthState`-DİR" DEYİRİK. Bunun NƏTİCƏSİ: `set({...})` ÇAĞIRANDA, YA DA `useAuthStore((s) => s.isAuthenticated)` YAZANDA, TypeScript DƏQIQ BİLİR Kİ, HANSI SAHƏLƏR VAR, HANSI YOXDUR — SƏHVƏN OLMAYAN BİR SAHƏ (`useAuthStore((s) => s.profil)` — "profil" SƏHV YAZILIB, DOĞRUSU "profile") YAZSANIZ, TypeScript DƏRHAL TUTAR.
14. `profile: getStoredProfile()` — store YARADILAN ANDA (səhifə ilk açılanda) `localStorage`-dan profili oxuyub başlanğıc dəyər kimi qoyur. Beləliklə, səhifəni yeniləsəniz (F5) belə, login "yadda qalır".
15. `isAuthenticated: !!getAccessToken()` — `!!` iki dəfə "yox" (NOT) işarəsidir, İSTƏNİLƏN dəyəri `true`/`false`-a çevirmək üçün trik: `getAccessToken()` bir string ("...") ya da `null` qaytarır; `!null` → `true`, `!"..."` → `false`, sonra bir daha `!` vuraraq: `!!null` → `false`, `!!"..."` → `true`. Yəni "token varsa `true`, yoxdursa `false`".
17-21. `login` — `async` funksiyadır (içində `await` var). `loginAdmin` (servis funksiyası, aşağıda) çağırılır, cavab gözlənilir, `saveSession` ilə `localStorage`-a yazılır, sonra `set({...})` ilə store-un CARİ vəziyyəti YENİLƏNİR — bu, bütün `useAuthStore`-a abunə olmuş komponentləri (`RequireAuth`, `Sidebar` və s.) AVTOMATİK yenidən render etdirir. **DİQQƏT:** `login: async (phone, password) => {...}` YAZILIB, PARAMETRLƏRƏ AYRICA `: string` YAZILMAYIB — ÇÜNKİ TypeScript ARTIQ YUXARIDAKI `interface AuthState`-DƏN "BİLİR" Kİ, `login`-İN İKİ STRİNG PARAMETRİ VAR (BU, "KONTEKSTUAL TİP" ADLANIR — TypeScript, BİR YERDƏ TİP TƏYİN EDİLİBSƏ, ONU TƏKRAR-TƏKRAR YAZDIRMIR).
23-26. `logout` — `clearSession()` ilə `localStorage` təmizlənir, `set({...})` ilə store-da `profile: null, isAuthenticated: false` qoyulur.
29-34. **Tab-lar arası sinxronizasiya** — `window.addEventListener('storage', ...)` brauzerin xüsusi bir hadisəsinə (event) qulaq asır. `storage` event-i YALNIZ o zaman atılır ki, `localStorage` BAŞQA BİR TAB-DA dəyişsin (öz tab-ınızda dəyişəndə SİZDƏ atılmır, digər açıq tab-larda atılır). Yəni: bir tab-da "Çıxış" etsəniz, digər açıq tab bunu bu listener vasitəsilə eşidir və öz `isAuthenticated`-ini də `false`-a çevirir → o tab-dakı `RequireAuth` da dərhal `/login`-ə yönləndirir.

### `src/services/authService.ts`

```ts
import api from './axiosInstance'
import type { LoginPayload, LoginResponse, Profile } from '@/types/auth'

export const loginAdmin = (payload: LoginPayload) =>
  api.post<LoginResponse>('/auth/admin/login', payload, { skipAuthRetry: true })
export const getProfile = () => api.get<Profile>('/admin/profile')
```

**Sətir-sətir:**
1. `api` — `axiosInstance.ts`-dən gətirilən, artıq konfiqurasiya edilmiş axios "instansı" (obyekti). Adi `axios` yox, MƏHZ BU layihənin özəl ayarları (base URL, header-lər, xəta idarəsi) ilə olanı.
4-5. `loginAdmin` — `api.post<LoginResponse>(yol, data, əlavə_ayarlar)`. **`<LoginResponse>`** — Hissə 3-DƏKİ GENERİK SİNTAKSİS: "BU SORĞUNUN CAVABI `LoginResponse` FORMASINDA (`{tokens, profile}`) OLACAQ" DEMƏKDİR — BUNU YAZDIQDAN SONRA, `loginAdmin(...)`-İN NƏTİCƏSİNİ İSTİFADƏ EDƏN HƏR YERDƏ (MƏS. YUXARIDAKI `useAuthStore`-DA `data.profile`), TypeScript ARTIQ DƏQİQ BİLİR `data`-NIN HANSI SAHƏLƏRƏ MALİK OLDUĞUNU. `{ skipAuthRetry: true }` — bu, axios-un ÖZÜNÜN taniyacağı bir seçim deyil, BİZİM ÖZ konfiqurasiyamızda (`axiosInstance.ts`-də) yoxlanan xüsusi bir bayraqdır (Hissə 3-DƏKİ `declare module` BÖLMƏSİNƏ BAXIN — MƏHZ BU SAHƏNİN TypeScript-Ə "TANIDILMASI" ORADA BAŞ VERİR): "bu sorğu 401 alsa, token-i yeniləməyə CƏHD ETMƏ" (çünki bu, MƏHZ LOGİN sorğusudur — səhv parol daxil edəndə 401 gəlir, bu, "sessiya bitib" demək deyil).
6. `getProfile` — sadə GET sorğusu, `<Profile>` GENERİK İLƏ, hazırda heç bir səhifədə İSTİFADƏ OLUNMUR, gələcək üçün hazırdır.

---

## Hissə 9: API qatı

### `src/types/api.ts` — ƏVVƏLCƏ TİPLƏRƏ BAXAQ

`axiosInstance.ts`-i OXUMAZDAN ƏVVƏL, ONUN İSTİFADƏ ETDİYİ TİPLƏRİN TƏYİN OLUNDUĞU FAYLA BAXAQ — Hissə 3-DƏ İZAH OLUNAN `declare module` VƏ `UnwrappedApi` MƏHZ BURADADIR:

```ts
import 'axios'
import type { AxiosRequestConfig } from 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipAuthRetry?: boolean
    _retry?: boolean
  }
}

export interface ApiEnvelope<T> {
  message: string
  data: T
  result: boolean
}

export interface UnwrappedApi {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>
  post<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T>
  put<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T>
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>
}
```

- `import 'axios'` + `declare module 'axios' { ... }` — Hissə 3-DƏ İZAH OLUNDU: `axios` PAKETİNİN ÖZÜNÜN `AxiosRequestConfig` TİPİNƏ, KƏNARDAN, `skipAuthRetry`/`_retry` SAHƏLƏRİNİ "ƏLAVƏ EDİRİK".
- `ApiEnvelope<T>` — BACKEND-İN STANDART CAVAB "ZƏRFİNİN" (`{message, data, result}`) TİPİDİR, **GENERİK**DİR (`<T>`) ÇÜNKİ `data` SAHƏSİNİN FORMASI HƏR ENDPOINT ÜÇÜN FƏRQLİDİR (BƏZƏN `Category`, BƏZƏN `Category[]`, VƏ S.) — BU FAYLDA TƏYİN OLUNSA DA, PRAKTİKADA BİRBAŞA İSTİFADƏ OLUNMUR (ÇÜNKİ `handleSuccess` ARTIQ ZƏRFİ AÇIR, AŞAĞIYA BAXIN), SADƏCƏ SƏNƏDLƏŞDİRMƏ MƏQSƏDİ DAŞIYIR.
- `UnwrappedApi` — Hissə 3-DƏ İZAH OLUNAN, EN VACİB TİPDİR: "ZƏRFİ AÇILMIŞ" (UNWRAPPED) BİR AXIOS-UN NECƏ GÖRÜNMƏLİ OLDUĞUNU TƏSVİR EDİR. `get<T>(url, config?): Promise<T>` — "BU FUNKSİYA, BİR `url` (VƏ OPSİONAL `config`) ALIR, VƏ `T` TİPİNDƏ BİR DƏYƏRİ `Promise` İLƏ QAYTARIR" DEMƏKDİR — DİQQƏT EDİN, `Promise<AxiosResponse<T>>` YOX, BİRBAŞA `Promise<T>` — ÇÜNKİ REAL AXIOS `AxiosResponse` (BÜTÜN HTTP CAVAB MƏLUMATLARI — STATUS KODU, HEADER-LƏR VƏ S.) QAYTARDIĞI HALDA, BİZİM `api`-MİZ (AŞAĞIDA GÖRƏCƏYİK) ARTIQ BUNU "AÇIB", BİRBAŞA FAYDALI DATANI QAYTARIR.

### `src/services/axiosInstance.ts` — ən mürəkkəb fayl, diqqətlə oxuyun

Bu fayl, layihədəki BÜTÜN backend sorğularının keçdiyi "mərkəzi məntəqədir". Hər `api.get(...)`/`api.post(...)` çağırışı, əslində bu fayldakı qaydalardan keçir.

```ts
import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import { getAccessToken, getRefreshToken, saveTokens, clearSession } from '@/lib/auth/session'
import { useAuthStore } from '@/store/useAuthStore'
import type { AuthTokens } from '@/types/auth'
import type { UnwrappedApi } from '@/types/api'

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/tiktak`

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Accept-Language': 'az' },
})
```

**Sətir-sətir:**
1. `import axios, { type AxiosError, ... } from 'axios'` — DİQQƏT EDİN, BİR SƏTİRDƏ HƏM ADİ İDXAL (`axios`, RUNTIME-da lazımdır), HƏM DƏ `type` İLƏ İŞARƏLƏNMİŞ TİP İDXALLARI (`AxiosError`, `AxiosResponse`, `InternalAxiosRequestConfig` — YALNIZ TypeScript ÜÇÜN) VAR — Hissə 3-DƏKİ `import type`-A BAXIN, BU, ONUN "QARIŞIQ" (BİR HİSSƏSİ TİP, BİR HİSSƏSİ DƏYƏR) FORMASIDIR.
5. `import.meta.env.VITE_API_BASE_URL` — Vite-in xüsusi sintaksisidir, `.env` faylındakı `VITE_API_BASE_URL=https://...` dəyərini oxuyur. TypeScript-in `VITE_API_BASE_URL`-in `string` OLDUĞUNU NECƏ "BİLDİYİ" Hissə 20-DƏ (`vite-env.d.ts`) İZAH OLUNUR. `${...}` template literal-dır (yuxarıda izah olundu) — iki string-i BİRLƏŞDİRİR: `.env`-dəki ünvan + sabit `/api/tiktak` sonluğu.
7-10. `axios.create({...})` — YENİ, ÖZƏLLƏŞDİRİLMİŞ bir axios "instansı" yaradır (adi `axios`-dan fərqli olaraq). `baseURL` — bundan sonra `api.get('/admin/categories')` yazsanız, əslində TAM ünvana (`BASE_URL + '/admin/categories'`) sorğu gedir. `headers: {'Accept-Language': 'az'}` — HƏR sorğuya avtomatik bu header əlavə olunur (backend-ə "cavabı Azərbaycan dilində ver" demək üçün). **BU NÖQTƏDƏ, `api` DƏYİŞƏNİ HƏLƏ "HƏQİQİ" AXIOS TİPİNDƏDİR** (`UnwrappedApi` YOX) — FAYLIN SONUNDA GÖRƏCƏYİMİZ KİMİ, TİPİ YALNIZ EXPORT EDƏNDƏ DƏYİŞDİRİRİK.

```ts
api.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
```

**"Interceptor" nədir?** — Hərfi tərcüməsi "ələ keçirən"dir. Axios-a "HƏR sorğu göndərilməzdən ƏVVƏL (request interceptor) BU funksiyanı işə sal" deyir. Burada: hər sorğudan əvvəl `localStorage`-dan token oxunur, VARSA, sorğunun header-lərinə `Authorization: Bearer <token>` əlavə olunur. `config` — sorğunun bütün ayarlarını (url, method, header-lər) daşıyan obyektdir, funksiyanın SONUNDA MÜTLƏQ geri qaytarılmalıdır (`return config`), yoxsa sorğu GETMƏZ. Bu funksiyanın PARAMETRİNƏ (`config`) AYRICA TİP YAZILMAYIB, ÇÜNKİ `api.interceptors.request.use(...)`-UN ÖZÜ ARTIQ "BU FUNKSİYA BELƏ BİR PARAMETR ALACAQ" DEYƏ TİPİ BİLDİRİR (Hissə 3-DƏKİ "KONTEKSTUAL TİP"-Ə BAXIN, `useAuthStore`-DAKI `login` MİSALI İLƏ EYNİ MƏNTİQ).

```ts
// Declared to return AxiosResponse only to satisfy axios's interceptor typing —
// at runtime this unwraps the `{data}` envelope to the raw payload. The real
// public contract callers see is `UnwrappedApi` (the `as unknown as UnwrappedApi`
// cast on the default export below), not this function's nominal return type.
const handleSuccess = (response: AxiosResponse) => (response.data.data ?? response.data) as AxiosResponse
```

Backend HƏR cavabı `{ message: "Ok", data: {...}, result: true }` formasında qaytarır (bu, layihənin backend-inin öz qaydasıdır — `docs/API.md`-də sənədləşdirilib). Bizə isə YALNIZ `data` hissəsi lazımdır, `message`/`result` yox. `response.data.data` — bu, "cavabın body-sinin İÇİNDƏKİ `data` sahəsi" deməkdir (`response.data` = bütün body, `response.data.data` = onun `data` sahəsi). `?? response.data` — əgər `data` sahəsi YOXDURSA (bəzi endpoint-lər — məs. statistika — bu qaydaya uymur, birbaşa xam obyekt qaytarır), onda BÜTÜN body-ni qaytar.

**`as AxiosResponse` NİYƏ VAR, HALBUKI QAYTARILAN DƏYƏR HƏQİQƏTƏN `AxiosResponse` DEYİL?** Bu, Hissə 3-DƏ QEYD OLUNAN, LAYİHƏDƏKİ ƏN "FƏRQLİ" TİP YAZISIDIR: `api.interceptors.response.use(...)` FUNKSİYASI (BİRAZ AŞAĞIDA GÖRƏCƏYİK) AXIOS-UN ÖZ TİP TƏLƏBİNƏ GÖRƏ, BU FUNKSİYANIN `AxiosResponse` QAYTARMASINI GÖZLƏYİR (ÇÜNKİ, TİP SƏVİYYƏSİNDƏ, `api` HƏLƏ "ADİ" AXIOS İNSTANSIDIR, `UnwrappedApi` YOX). AMMA RUNTIME-DA (KODUN HƏQİQİ İŞLƏMƏ ANINDA), BU FUNKSİYA ARTIQ ZƏRFİ AÇIB, TAM FƏRQLİ BİR FORMA (`XApi` KİMİ BİR OBYEKT, YA DA MASSİV) QAYTARIR. YƏNİ: **BU FUNKSİYANIN "ELAN OLUNAN" TİPİ İLƏ "HƏQİQİ" DAVRANIŞI QƏSDƏN FƏRQLİDİR** — BU UYĞUNSUZLUĞUN "DÜZGÜN" TƏRƏFİ, FAYLIN SONUNDAKI `export default api as unknown as UnwrappedApi` SƏTRİDİR (AŞAĞIDA GÖRƏCƏYİK) — ORADAN SONRA, LAYİHƏNİN QALAN HİSSƏSİ ARTIQ `api`-Nİ `UnwrappedApi` KİMİ GÖRÜR, BU ARADAKI "KİÇİK YALANI" GÖRMÜR.

```ts
const STATUS_MESSAGES: Record<number, string> = {
  400: 'Məlumatlar düzgün deyil',
  403: 'Bu əməliyyat üçün icazəniz yoxdur',
  404: 'Tapılmadı',
  409: 'Bu məlumat artıq mövcuddur',
  422: 'Məlumatlar düzgün deyil',
  500: 'Server xətası baş verdi',
}

function getErrorMessage(error: AxiosError, isLogin?: boolean): string {
  if (!error.response) return 'Serverə qoşulmaq mümkün olmadı'
  if (error.response.status === 401) {
    return isLogin ? 'Telefon və ya parol yanlışdır' : 'Sessiya bitib, yenidən daxil olun'
  }
  const isProductDelete = error.config?.method === 'delete' && /\/admin\/products\//.test(error.config?.url ?? '')
  if (isProductDelete && [400, 422].includes(error.response.status)) {
    return 'Bu məhsul mövcud sifarişlərdə istifadə olunduğu üçün silinə bilməz'
  }
  // Eyni FK qaydası kateqoriyalar üçün də tətbiq olunur — kateqoriyaya bağlı
  // məhsullar mövcuddursa, backend silməyə icazə vermir.
  const isCategoryDelete = error.config?.method === 'delete' && /\/admin\/categories\//.test(error.config?.url ?? '')
  if (isCategoryDelete && [400, 422].includes(error.response.status)) {
    return 'Bu kateqoriya mövcud məhsullarda istifadə olunduğu üçün silinə bilməz'
  }
  return STATUS_MESSAGES[error.response.status] || 'Xəta baş verdi'
}
```

`STATUS_MESSAGES: Record<number, string>` — Hissə 3-DƏKİ `Record<Açar, Dəyər>`-Ə BAXIN: "AÇARLARI RƏQƏM (HTTP STATUS KODLARI), DƏYƏRLƏRİ STRİNG (AZƏRBAYCANCA MESAJ) OLAN BİR OBYEKT" DEMƏKDİR. Backend-in ÖZÜ ingiliscə mesaj qaytarır (`"Password is wrong!"` kimi) — biz bunu İSTİFADƏÇİYƏ GÖSTƏRMİRİK, ƏVƏZİNƏ status koduna görə ÖZ Azərbaycanca mesajımızı seçirik ki, bütün bildirişlər eyni dildə olsun.

`getErrorMessage(error: AxiosError, isLogin?: boolean): string`:
- `error: AxiosError` — PARAMETRİN TİPİ AXIOS-UN ÖZ XƏTA TİPİDİR (BÜTÜN XƏTA SORĞULARININ ORTAQ FORMASI — `response`, `config` KİMİ SAHƏLƏRİ VAR).
- `isLogin?: boolean` — Hissə 3-DƏKİ `?` İLƏ, "BU PARAMETR OPSİONALDIR" (verilməyə bilər, verilməzsə `undefined` OLUR).
- `: string` — FUNKSİYANIN QAYTARDIĞI DƏYƏRİN TİPİ (HƏMİŞƏ BİR MƏTN).
- `if (!error.response) return '...'` — `error.response` YOXDURSA (server heç cavab verməyib — internet kəsilib, server düşüb), "serverə qoşulmaq mümkün olmadı" qaytarır.
- `if (error.response.status === 401)` — 401 = "icazən yoxdur" (token səhvdir/vaxtı keçib, ya da login-də parol səhvdir). `isLogin ? '...' : '...'` — ƏGƏR bu, login sorğusudursa (parametr olaraq ötürülür) "parol yanlışdır" göstərir, YOX ƏGƏR başqa bir sorğudursa "sessiya bitib" göstərir — çünki İKİ FƏRQLİ hadisədir.
- `const isProductDelete = error.config?.method === 'delete' && /\/admin\/products\//.test(error.config?.url ?? '')` — BU SƏTİR, MƏHSUL SİLİNMƏSİ ZAMANI BAŞ VERƏN XÜSUSİ BİR XƏTA HALINI YOXLAYIR (SİFARİŞDƏ İSTİFADƏ OLUNAN MƏHSUL SİLİNƏ BİLMƏZ). `error.config?.url ?? ''` — `?.` (OPTIONAL CHAINING) + `?? ''` (NULLISH COALESCING) BİRLİKDƏ İŞLƏNİB (Hissə 2-Ə BAXIN): `error.config` YOXDURSA XƏTA VERMİR, `url` DƏ YOXDURSA BOŞ STRİNG İSTİFADƏ OLUNUR.
- **SONRADAN ƏLAVƏ OLUNAN `isCategoryDelete`** — EYNİ NÜMUNƏNİN, EYNİ FK (foreign key) MƏHDUDİYYƏTİNİN KATEQORİYALAR ÜÇÜN DƏ MÖVCUD OLDUĞU AŞKAR EDİLƏNDƏN SONRA ƏLAVƏ OLUNUB — MƏHSUL SİLİNMƏSİNDƏKİ EYNİ REGEX+STATUS-KODU NÜMUNƏSİ, YALNIZ URL-İ (`/admin/categories/`) VƏ MESAJI DƏYİŞDİRİLƏRƏK TƏKRARLANIB. Bu, "BÖLMƏSƏYDİK NECƏ OLARDI" SUALINA DA CAVABDIR — Bu İKİ BLOKU BİR ÜMUMİ FUNKSİYAYA (`buildFkDeleteMessage(resource, message)` KİMİ) BİRLƏŞDİRMƏK DƏ MÜMKÜN OLARDI, AMMA CƏMİ İKİ NÜMUNƏ ÜÇÜN BU, HƏLƏLİK ARTIQ BİR MÜCƏRRƏDLƏŞDİRMƏ (abstraction) SAYILIB, TƏKRAR SAXLANILIB — LAYİHƏNİN "ÜÇ OXŞAR SƏTİR, VAXTINDAN ƏVVƏL MÜCƏRRƏDLƏŞDİRMƏDƏN YAXŞIDIR" PRİNSİPİNƏ UYĞUN OLARAQ.
- Son sətir: `STATUS_MESSAGES[error.response.status]` — obyektdən status koduna GÖRƏ mesajı ÇIXARIR (`[...]` ilə DİNAMİK açar oxumaq). `|| 'Xəta baş verdi'` — obyektdə HƏMİN kod ÜÇÜN mesaj yoxdursa (məs. 502), ÜMUMİ bir mesaj qaytarır.

```ts
let refreshPromise: Promise<AuthTokens> | null = null

function refreshAccessToken(): Promise<AuthTokens> {
  if (!refreshPromise) {
    refreshPromise = axios
      .post(`${BASE_URL}/auth/refresh`, { refresh_token: getRefreshToken() }, { headers: { 'Accept-Language': 'az' } })
      .then((res) => {
        const tokens = res.data.data as AuthTokens
        saveTokens(tokens)
        return tokens
      })
      .finally(() => {
        refreshPromise = null
      })
  }
  return refreshPromise
}
```

Bu funksiya, access token-in VAXTI keçəndə YENİSİNİ almaq üçündür (backend-in `/auth/refresh` endpoint-i vasitəsilə).

- `let refreshPromise: Promise<AuthTokens> | null = null` — `const` YOX, `let` (çünki bu dəyər DƏYİŞƏCƏK). **TİP:** `Promise<AuthTokens> | null` — Hissə 3-DƏKİ UNION: "YA HƏLƏ DAVAM EDƏN BİR REFRESH SORĞUSUNUN `Promise`-İ, YA DA (HEÇ BİR SORĞU GETMİRSƏ) `null`". Başlanğıcda heç bir "davam edən refresh sorğusu" yoxdur, ona görə `null`.
- `if (!refreshPromise)` — ƏGƏR HAZIRDA davam edən bir refresh sorğusu YOXDURSA, YENİ bir sorğu BAŞLAT. **Niyə bu yoxlama var?** Təsəvvür edin ki, EYNİ ANDA 3 fərqli sorğu 401 alıb — hər üçü token-i yeniləməyə çalışsa, backend-ə 3 DƏFƏ refresh sorğusu gedərdi (lazımsız). Bu yoxlama ilə: birinci sorğu refresh-i BAŞLADIR VƏ `refreshPromise`-a YAZIR, digər ikisi "artıq davam edir" görüb, EYNİ `refreshPromise`-ı GÖZLƏYİR (aşağıda `return refreshPromise` buna görədir).
- `axios.post(...)` — DİQQƏT: `api.post` YOX, sadə `axios.post`! Çünki `api` instansının ÖZÜNDƏ bizim interceptor-larımız var — əgər `api.post` işlətsəydik və bu sorğu DA 401 alsaydı, YENİDƏN `handleError`-a düşüb, YENİDƏN refresh cəhd edərdi — SONSUZ DÖVRƏ yaranardı. Sadə `axios.post` bu interceptor-ları BÜTÜNLƏYKƏN keçir.
- `.then((res) => { const tokens = res.data.data as AuthTokens; saveTokens(tokens); return tokens })` — sorğu uğurlu olanda, `res.data.data`-nı (SƏRBƏST AXIOS SORĞUSU OLDUĞU ÜÇÜN, BURADA `handleSuccess` İŞƏ DÜŞMÜR, ZƏRFİ ƏL İLƏ AÇIRIQ) `as AuthTokens` İLƏ TİPLƏYİRİK, `localStorage`-a yazır VƏ onları qaytarır.
- `.finally(() => { refreshPromise = null })` — sorğu istər uğurlu, istər uğursuz bitsin, `finally` HƏR HALDA işə düşür — `refreshPromise`-ı yenidən `null`-a QAYTARIR ki, NÖVBƏTİ dəfə YENİ bir refresh cəhdi edilə bilsin.
- `return refreshPromise` — bu, EGƏR yeni sorğu başladılıbsa, ONU; YOX, ARTIQ davam edən vardısa, O DAVAM edəni qaytarır.

```ts
const handleError = async (error: AxiosError) => {
  const original = error.config as InternalAxiosRequestConfig
  const isUnauthorized = error.response?.status === 401
  const canRetry = isUnauthorized && !original.skipAuthRetry && !original._retry && getRefreshToken()

  if (canRetry) {
    original._retry = true
    try {
      await refreshAccessToken()
      return api(original)
    } catch {
      clearSession()
      useAuthStore.getState().logout()
    }
  } else if (isUnauthorized && !original.skipAuthRetry) {
    clearSession()
    useAuthStore.getState().logout()
  }

  return Promise.reject(new Error(getErrorMessage(error, original.skipAuthRetry)))
}

api.interceptors.response.use(handleSuccess, handleError)

export default api as unknown as UnwrappedApi
```

Bu, "response interceptor"-un XƏTA hissəsidir — HƏR sorğu XƏTA (400, 401, 404, 500 və s.) ilə qayıdanda BU funksiya işə düşür.

- `const original = error.config as InternalAxiosRequestConfig` — `error.config` (AXIOS-UN ÖZ TİPİNƏ GÖRƏ) NƏZƏRİ OLARAQ `undefined` DƏ OLA BİLƏR, AMMA PRAKTİKADA (XƏTA VERƏN SORĞUNUN ÖZÜ VARSA) HƏMİŞƏ MÖVCUDDUR — `as InternalAxiosRequestConfig` İLƏ BUNU "QƏTİLƏŞDİRİRİK" (Hissə 3-DƏKİ `as`-A BAXIN). `InternalAxiosRequestConfig` — AXIOS-UN DAXİLİ İSTİFADƏ ETDİYİ, `_retry` KİMİ ƏLAVƏ SAHƏLƏRİ DƏ EHTİVA EDƏN GENİŞLƏNDİRİLMİŞ TİPİDİR (BİZİM `declare module` AUGMENTASİYAMIZ MƏHZ BUNA TƏSİR EDİR, ÇÜNKİ O DA `AxiosRequestConfig`-DƏN "MİRAS ALIR"). XƏTA VƏRƏN ORİJİNAL sorğunun bütün ayarlarını (url, method, data) saxlayır — lazım olsa, EYNİ sorğunu TƏKRAR göndərmək üçün.
- `const isUnauthorized = error.response?.status === 401` — status kodu DƏQİQ 401-dirsə `true`. `?.` — `error.response` YOXDURSA (şəbəkə xətasıdırsa) xəta VERMƏDƏN `undefined` qaytarır, `undefined === 401` isə `false` olur — düzgün işləyir.
- `const canRetry = isUnauthorized && !original.skipAuthRetry && !original._retry && getRefreshToken()` — DÖRD şərtin HAMISI doğru olmalıdır ki, `canRetry` `true` olsun (`original.skipAuthRetry`/`original._retry` — MƏHZ BİZİM `declare module` İLƏ AXIOS-A "TANITDIĞIMIZ" O İKİ ƏLAVƏ SAHƏDİR, Hissə 3-Ə BAXIN):
  1. `isUnauthorized` — 401-dir,
  2. `!original.skipAuthRetry` — bu sorğu "retry etmə" işarəli DEYİL (login sorğusu belə işarələnib, yuxarıda görmüşdük),
  3. `!original._retry` — bu sorğu ARTIQ BİR DƏFƏ retry EDİLMƏYİB (aşağıda `original._retry = true` yazılır ki, İKİNCİ DƏFƏ eyni sorğu YENƏ 401 versə, SONSUZ dövrəyə düşməsin),
  4. `getRefreshToken()` — `localStorage`-da bir refresh token VAR (yoxdursa, refresh cəhd etməyin mənası yoxdur).
- `if (canRetry) { ... }` — bütün şərtlər ödənibsə:
  - `original._retry = true` — bu sorğunu "artıq cəhd edilib" kimi İŞARƏLƏYİR (BU YAZI İCAZƏLİDİR, ÇÜNKİ `declare module` AUGMENTASİYASI `_retry`-Nİ "YAZILA BİLƏN" SAHƏ KİMİ TANITDIRIB).
  - `await refreshAccessToken()` — YUXARIDA izah olunan funksiyanı çağırıb, YENİ token gələnə qədər GÖZLƏYİR.
  - `return api(original)` — token yeniləndikdən SONRA, ORİJİNAL sorğunu (indi YENİ token ilə, çünki request interceptor YENİDƏN işə düşəcək) TƏKRAR göndərir.
  - `catch { ... }` — `refreshAccessToken()` DƏ uğursuz olsa (refresh token da etibarsızdırsa), `clearSession()` + `logout()` çağırılır — istifadəçi TAM çıxış edir.
- `else if (isUnauthorized && !original.skipAuthRetry)` — ƏGƏR 401-dir AMMA retry ŞƏRTLƏRİ ödənmirsə (məs. refresh token YOXDUR) — birbaşa logout.
- **DİQQƏT**: `original.skipAuthRetry` OLAN sorğular (login) BU BLOKLARIN HEÇ BİRİNƏ DÜŞMÜR — sadəcə aşağıya, son sətrə keçir.
- `return Promise.reject(new Error(getErrorMessage(error, original.skipAuthRetry)))` — FUNKSİYANIN SONU: XƏTANI Azərbaycanca mesajla YENİDƏN "rədd edir" (reject) — bu, çağıran koda (`catch (err) { toast.error(err instanceof Error ? err.message : ...) }`) gedib çatır. **BURADAN GÖRÜNDÜYÜ KİMİ, LAYİHƏDƏ BÜTÜN XƏTALAR SON NƏTİCƏDƏ ADİ, SADƏ BİR `Error` OBYEKTİDİR** — Hissə 3-DƏKİ `unknown`/`catch` BÖLMƏSİNDƏ QEYD OLUNAN "PRAKTİKADA HƏMİŞƏ `Error`-DUR" İDDİASININ SƏBƏBİ MƏHZ BURADADIR.
- `api.interceptors.response.use(handleSuccess, handleError)` — BU SƏTİR, YUXARIDA yazılan İKİ funksiyanı FAKTİKİ OLARAQ AXİOS-A "TANIDIR": BİRİNCİ arqument (`handleSuccess`) uğurlu cavablar üçün, İKİNCİ (`handleError`) xətalar üçün işə düşür.
- **`export default api as unknown as UnwrappedApi`** — LAYİHƏNİN ƏN QABAQCIL TİP SƏTRİDİR, Hissə 3-DƏ ARTIQ İZAH OLUNDU: `api` HƏQİQƏTDƏ AXIOS-UN ÖZ TİPİNDƏDİR, AMMA BİZ BİLİRİK Kİ, `handleSuccess` İNTERCEPTORU SAYƏSİNDƏ, O, ARTIQ FƏRQLİ (ZƏRFSİZ) BİR ŞEY QAYTARIR — `as unknown as UnwrappedApi` (İKİ ADDIMLI ASSERSİYA) İLƏ, EXPORT OLUNAN `api`-Nİ, HƏQİQİ DAVRANIŞINA UYĞUN OLAN `UnwrappedApi` TİPİNƏ "ÇEVİRİRİK". BUNDAN SONRA, HƏR SERVİS FAYLINDA (`categoryService.ts` VƏ S.) `api.get<CategoryApi[]>(...)` YAZANDA, TypeScript ARTIQ "DÜZGÜN" NƏTİCƏ TİPİNİ (`Promise<CategoryApi[]>`, `Promise<AxiosResponse<CategoryApi[]>>` YOX) GÖSTƏRİR.

### Servis faylları (`src/services/*.ts`)

Bu fayllar ÇOX SADƏDİR — hər biri BİR resurs (kateqoriyalar, məhsullar və s.) üçün HTTP sorğusu FUNKSİYALARINI ixrac edir. Misal:

```ts
// categoryService.ts
import api from './axiosInstance'
import type { CategoryApi, CategoryPayload } from '@/types/category'

export const listCategories = () => api.get<CategoryApi[]>('/admin/categories')
export const createCategory = (payload: CategoryPayload) => api.post<CategoryApi>('/admin/category', payload)
export const updateCategory = (id: number, payload: CategoryPayload) =>
  api.put<CategoryApi>(`/admin/categories/${id}`, payload)
export const deleteCategory = (id: number) => api.delete<null>(`/admin/categories/${id}`)
```
- `api.get<CategoryApi[]>('/admin/categories')` — GET sorğusu, "CAVAB, `CategoryApi` OBYEKTLƏRİNDƏN İBARƏT BİR MASSİVDİR" (`CategoryApi[]`) DEYƏRƏK, siyahını GƏTİRİR.
- `api.post<CategoryApi>('/admin/category', payload)` — POST, "CAVAB, TƏK BİR `CategoryApi` OLACAQ" DEYƏRƏK, YENİ kateqoriya YARADIR (`payload: CategoryPayload` — göndəriləcək data, TİPLƏNMİŞ).
- `api.put<CategoryApi>(\`/admin/categories/${id}\`, payload)` — PUT, MÖVCUD kateqoriyanı YENİLƏYİR (`id: number` — TİPLƏNMİŞ PARAMETR, şablon literalla URL-in İÇİNƏ yerləşdirilir).
- `api.delete<null>(\`/admin/categories/${id}\`)` — DELETE, "CAVABDA HEÇ BİR FAYDALI DATA YOXDUR" (`<null>`, ÇÜNKİ SİLİNMƏ CAVABI `docs/API.md`-YƏ GÖRƏ `data: null` QAYTARIR) DEYƏRƏK, KATEQORIYANI SİLİR.

**Diqqət**: `createCategory` TƏK saylı `/admin/category`, digər 3-ü isə CƏM saylı `/admin/categories` yolundan istifadə edir — bu, BİZİM SƏHVİMİZ DEYİL, BACKEND-in ÖZ QAYDASIDIR (sənədləşdirilib, `docs/API.md`-yə baxın).

`orderService.ts` bir az FƏRQLİDİR:
```ts
import api from './axiosInstance'
import type { OrderApi, OrderStats, OrderStatus } from '@/types/order'

export const listOrders = () => api.get<OrderApi[]>('/orders/admin')
// Backend may omit some status counters (e.g. CANCELLED) — see docs/API.md §8.2 —
// so the raw fetch is honestly Partial here; Orders.tsx merges it with its own
// client-computed status counts before treating it as a full OrderStats.
export const getOrderStats = () => api.get<Partial<OrderStats>>('/orders/admin/stats')
export const updateOrderStatus = (id: number, status: OrderStatus) =>
  api.put<OrderApi>(`/orders/admin/${id}/status`, { status })
```
`getOrderStats(): Promise<Partial<OrderStats>>` — Hissə 3-DƏKİ `Partial<X>`-Ə BAXIN: "BU SORĞUNUN CAVABI, `OrderStats`-IN SAHƏLƏRİNƏ MALİKDİR, AMMA HAMISI OPSİONALDIR (OLMAYA DA BİLƏR)" DEYİR — ÇÜNKİ BACKEND HƏQİQƏTƏN BƏZƏN BƏZİ STATUS SAYĞACLARINI (MƏS. `CANCELLED`) QAYTARMIR (Hissə 18-DƏ, `Orders.tsx`-İN İZAHINDA, BU PROBLEMİN NECƏ HƏLL OLUNDUĞUNU GÖRƏCƏYİK). `updateOrderStatus(id, status)` — İKİNCİ arqument `payload` obyekti DEYİL, `status: OrderStatus` (TİPLƏNMİŞ, YALNIZ 6 MÜMKÜN DƏYƏRDƏN BİRİ) bir dəyişəndir, AMMA PUT sorğusunun body-si HƏMİŞƏ OBYEKT olmalıdır, ona görə `{ status }` yazılıb — bu, `{ status: status }`-in QISA FORMASIDIR.

`uploadService.ts` isə FƏRQLİ bir NÖV data göndərir:
```ts
import api from './axiosInstance'
import type { UploadResponse } from '@/types/upload'

export const uploadImage = (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  return api.post<UploadResponse>('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}
```
`file: File` — `File`, BRAUZERİN ÖZ DAXİLİ TİPİDİR ("İSTİFADƏÇİNİN KOMPÜTERİNDƏN SEÇİLƏN BİR FAYL" DEMƏKDİR), TypeScript-in ÖZÜ İLƏ GƏLİR, AYRICA İDXAL EDİLMİR. **`UploadResponse` ARTIQ BU FAYLDA `interface` KİMİ TƏYİN OLUNMUR** — Hissə 5-dəki "bir NÖV — bir fayl" qaydası tətbiq olunub, İNDİ `types/upload/UploadResponse.ts`-dədir (KÖHNƏ DOKUMENTASİYADA "BAŞQA HEÇ BİR YERDƏ İSTİFADƏ OLUNMADIĞI ÜÇÜN `types/`-ə daşınmayıb" DEYİLİRDİ — BU, ARTIQ DOĞRU DEYİL: KONVENSİYA "İSTİFADƏ SAYINDAN ASILI OLMAYARAQ HƏR TİP `types/`-DƏDİR"-Ə DƏYİŞİB). `FormData` — brauzerin daxili bir obyektidir, FAYL göndərmək üçün istifadə olunur (adi JSON YOX). `.append('file', file)` ilə faylı bu obyektə ƏLAVƏ edir, sonra `Content-Type: multipart/form-data` header-i ilə göndərir (server FAYL sorğularını BELƏ gözləyir).

---

## Hissə 10: Adapterlər

**Niyə adapter lazımdır?** Backend datanı BİR FORMATDA göndərir (`img_url`, `created_at`, snake_case sahə adları), amma UI-mizin (forma, cədvəl) İSTİFADƏ ETDİYİ sahə adları FƏRQLİDİR (`imageUrl`, `date`). Adapter faylları BU İKİ FORMAT arasında "tərcüməçi" rolunu OYNAYIR. **TypeScript-lə, HƏR ADAPTER FUNKSİYASI, GİRİŞ VƏ ÇIXIŞ TİPİNİ AÇIQ-AŞKAR BİLDİRİR** — YƏNİ, MƏSƏLƏN, `mapCategoryFromApi`, "MÜTLƏQ `CategoryApi` FORMASINDA BİR ŞEY ALIB, MÜTLƏQ `Category` FORMASINDA BİR ŞEY QAYTARACAĞINI" VƏD EDİR.

### `src/lib/adapters/category.ts`

```ts
import { formatDate } from '@/utils/FormatDate'
import type { Category, CategoryApi, CategoryForm, CategoryPayload } from '@/types/category'

const FALLBACK = { image: '🏷️', color: '#f3f4f6' }

export const mapCategoryFromApi = (c: CategoryApi): Category => ({
  id: c.id,
  ...FALLBACK,
  imageUrl: c.img_url || '',
  name: c.name,
  description: c.description,
  date: formatDate(c.created_at),
})

export const mapCategoryToApi = (form: CategoryForm): CategoryPayload => ({
  name: form.name,
  description: form.description,
  img_url: form.imageUrl || '',
})
```

**Sətir-sətir:**
3. `FALLBACK` — API-dən HEÇ VAXT gəlməyən, amma UI-nin gözlədiyi "dekorativ" sahələr (emoji + fon rəngi) — API-də ŞƏKİL yoxdursa, BU EMOJİ göstərilir.
5. **`mapCategoryFromApi = (c: CategoryApi): Category => ({...})`** — BURADA, HƏM PARAMETRİN (`c: CategoryApi`), HƏM DƏ QAYTARILAN DƏYƏRİN (`: Category`) TİPİ AÇIQ YAZILIB. **BUNUN ƏSAS FAYDASI:** ƏGƏR AŞAĞIDA, OBYEKTİN İÇİNDƏ BİR SAHƏNİ SƏHVƏN UNUTSANIZ (MƏS. `description`-U YAZMASANIZ) VƏ YA SƏHV TİPDƏ BİR DƏYƏR VERSƏNİZ (MƏS. `date: 5` — RƏQƏM, STRİNG YOX), TypeScript BUNU DƏRHAL TUTAR — ÇÜNKİ NƏTİCƏ `Category` FORMASINA UYĞUN GƏLMİR.
   - `id: c.id` — dəyişmir, birbaşa köçürülür.
   - `...FALLBACK` — SPREAD ilə `image`/`color` sahələrini BURAYA "tökür" (yuxarıda izah olundu).
   - `imageUrl: c.img_url || ''` — API-nin `img_url`-unu UI-nin `imageUrl`-una köçürür (AD DƏYİŞİR!). `|| ''` — `img_url` `null`/`undefined`/boş STRİNGDİRSƏ, boş STRİNG istifadə olunur (undefined YOX).
   - `date: formatDate(c.created_at)` — API-nin ISO tarixini (`"2025-06-12T05:37:56.753Z"` kimi) OXUNAQLI formata (`"12.06.2025"`) ÇEVİRİR (aşağıda `formatDate` izah olunur).
14. `mapCategoryToApi = (form: CategoryForm): CategoryPayload => ({...})` — TƏRS İSTİQAMƏT: FORMA datasını (UI formatı) API-nin GÖZLƏDİYİ formata ÇEVİRİR — YARADILAN/YENİLƏNƏN kateqoriya BUNUNLA serverə GÖNDƏRİLİR. `image`/`color`/`date` GÖNDƏRİLMİR (API bunları QƏBUL ETMİR, VƏ `CategoryPayload` TİPİNDƏ BU SAHƏLƏR ARTIQ YOXDUR, ONA GÖRƏ YAZMAĞA BELƏ CƏHD ETSƏNİZ, TypeScript XƏTA VERƏR), YALNIZ `name`/`description`/`img_url`.

### `src/lib/adapters/order.ts` (bir az daha MÜRƏKKƏBDİR)

```ts
import { formatDate } from '@/utils/FormatDate'
import { PRODUCT_TYPE_LABELS } from '@/lib/constants/productTypes'
import type { Order, OrderApi, OrderItem } from '@/types/order'

const FALLBACK = { image: '📦', color: '#f3f4f6' }

export const mapOrderFromApi = (o: OrderApi): Order => ({
  id: o.id,
  orderNumber: o.orderNumber,
  date: formatDate(o.createdAt),
  createdAt: o.createdAt,
  address: o.address,
  phone: o.phone,
  paymentMethod: o.paymentMethod === 'CARD' ? 'Kart' : 'Nağd',
  status: o.status,
  subtotal: o.total,
  freeShipping: Number(o.deliveryFee) === 0,
  itemCount: o.items?.length ?? 0,
  user: o.user ?? null,
  items: (o.items ?? []).map((it): OrderItem => {
    const productType = it.product?.type
    return {
      name: it.product?.title ?? '',
      category: it.product?.category?.name ?? '',
      weight: `${it.quantity} ${productType ? PRODUCT_TYPE_LABELS[productType] : ''}`.trim(),
      price: it.product?.price ?? it.total_price,
      unit: productType ? PRODUCT_TYPE_LABELS[productType] : '',
      ...FALLBACK,
    }
  }),
})
```

**Fərqli/mürəkkəb sətirlər:**
- `createdAt: o.createdAt` — YUXARIDA (Hissə 5-DƏ) İZAH OLUNAN, SIRALAMA ÜÇÜN ƏLAVƏ OLUNAN XAM ISO TARİX — `date`-DƏN FƏRQLİ OLARAQ, HEÇ BİR ÇEVRİLMƏ APARILMIR, BACKEND-DƏN GƏLƏN DƏYƏR EYNƏN SAXLANILIR.
- `paymentMethod: o.paymentMethod === 'CARD' ? 'Kart' : 'Nağd'` — API-nin ingiliscə enum-unu (`"CARD"`/başqa) Azərbaycanca sözə ÇEVİRİR. `Order.paymentMethod`-un TİPİ `'Kart' | 'Nağd'` (Hissə 5-Ə BAXIN) — YƏNİ, BU SƏTİR HƏQİQƏTƏN DƏ HƏMİŞƏ BU İKİ MƏTNDƏN BİRİNİ QAYTARMALIDIR, TypeScript BUNU YOXLAYIR.
- `freeShipping: Number(o.deliveryFee) === 0` — `deliveryFee` (çatdırılma haqqı) BİR STRİNGDİRSƏ (`"0.00"`), `Number(...)` onu ƏSL RƏQƏMƏ çevirir, sonra `=== 0` yoxlayır — "haqq sıfırdırsa, pulsuz çatdırılmadır" (`true`/`false`).
- `itemCount: o.items?.length ?? 0` — `o.items` bir MASSİVDİRSƏ, `.length`-i (say) götürür; `o.items` `null`/`undefined`-dırsa `?.` sayəsində XƏTA VERMİR, sonra `?? 0` ilə "0" DEFAULT DƏYƏRİ QOYULUR. (`OrderApi.items?: OrderItemApi[]` — TİPİNDƏ DƏ `?` VAR, ONA GÖRƏ TypeScript BU YOXLAMANI MƏHZ YAZMAĞA MƏCBUR EDİR — YOXLAMASIZ `o.items.length` YAZSANIZ, TypeScript "BU, `undefined` OLA BİLƏR" DEYƏ XƏTA VERƏR.)
- `items: (o.items ?? []).map((it): OrderItem => { ... })` — `o.items` YOXDURSA, BOŞ MASSİV (`[]`) istifadə olunur (ki, `.map()` XƏTA VERMƏSİN), sonra HƏR bir sifariş ELEMENTİNİ (`it`) UI FORMATINA çevirir. `(it): OrderItem =>` — HƏR BİR NƏTİCƏNİN `OrderItem` FORMASINDA OLACAĞINI BİLDİRİR.
- **`const productType = it.product?.type` VƏ SONRA `productType ? PRODUCT_TYPE_LABELS[productType] : ''`** — BU HİSSƏ, JS VERSİYASI İLƏ MÜQAYİSƏDƏ ƏN ÇOX DƏYİŞƏN YERDİR: ƏVVƏLKİ KODDA BİRBAŞA `PRODUCT_TYPE_LABELS[it.product?.type]` YAZILIRDI, AMMA TypeScript BUNA İCAZƏ VERMİR — ÇÜNKİ `it.product?.type`-IN NƏTİCƏSİ `ProductType | undefined`-DIR (MƏHSUL YOXDURSA, TİP DƏ YOXDUR), `PRODUCT_TYPE_LABELS` İSƏ YALNIZ HƏQİQİ `ProductType` DƏYƏRLƏRİ İLƏ "İNDEKSLƏNƏ" BİLƏR, `undefined` İLƏ YOX. Ona görə ƏVVƏLCƏ `productType`-I AYRICA BİR DƏYİŞƏNƏ ÇIXARIRIQ, SONRA `productType ? ... : ''` İLƏ YOXLAYIRIQ (Hissə 3-DƏKİ "DARALTMA" MƏNTİQİ) — YOXLAMADAN SONRA, TypeScript `productType`-IN ARTIQ `undefined` OLMADIĞINI (MƏHZ `ProductType` OLDUĞUNU) BİLİR, VƏ `PRODUCT_TYPE_LABELS[productType]` İNDİ TƏHLÜKƏSİZDİR.
  - `weight: \`${it.quantity} ${...}\`.trim()` — MİQDAR + ölçü VAHİDİNİ ("2 Ədəd" kimi) BİRLƏŞDİRİR. `.trim()` — nəticənin ƏVVƏLİNDƏ/SONUNDA yaranan boşluqları TƏMİZLƏYİR (məs. ölçü tapılmasa boş qalar, ətrafda boşluq qalmasın deyə).
  - `...FALLBACK` — HƏR ELEMENTƏ dekorativ emoji+rəng ƏLAVƏ EDİR (sifariş elementlərinin ÖZ şəkli YOXDUR).

### `src/lib/adapters/product.ts`

```ts
import { formatDate } from '@/utils/FormatDate'
import type { Product, ProductApi, ProductForm, ProductPayload } from '@/types/product'

const FALLBACK = { image: '📦', color: '#f3f4f6' }

export const mapProductFromApi = (p: ProductApi): Product => ({
  id: p.id,
  ...FALLBACK,
  imageUrl: p.img_url || '',
  name: p.title,               // DİQQƏT: API "title" adlanır, UI "name" işlədir!
  description: p.description,
  price: p.price,
  type: p.type,
  category: p.category ?? null,      // NESTED (iç-içə) obyekt — {id, name}
  category_id: p.category?.id ?? '', // dropdown üçün, TƏK ID lazımdır
  date: formatDate(p.created_at),
})

export const mapProductToApi = (form: ProductForm): ProductPayload => ({
  title: form.name,                  // GERİYƏ "title"-a çevrilir
  description: form.description,
  price: String(form.price),         // `String(...)` rəqəmi/nə olur-olsun STRİNGƏ ÇEVİRİR
  type: form.type,
  img_url: form.imageUrl || '',
  category_id: Number(form.category_id), // `Number(...)` STRİNGİ RƏQƏMƏ çevirir (HTML select həmişə STRİNG qaytarır)
})
```
`String(form.price)` və `Number(form.category_id)` — HTML formalarındakı DƏYƏRLƏR həmişə STRİNGDİR (hətta `<input type="number">` olsa belə), amma API MÜƏYYƏN sahələrdə DƏQİQ TİP (rəqəm) GÖZLƏYİR — buna görə GÖNDƏRMƏZDƏN ƏVVƏL AÇIQ ÇEVİRİRİK. **`mapProductToApi`-NİN QAYTARDIĞI TİP `ProductPayload`-DUR, HARADA `category_id: number` (STRİNG YOX)** — BU DA `Number(form.category_id)` YAZILMASININ SƏBƏBLƏRİNDƏN BİRİDİR: `form.category_id` (Hissə 5-Ə BAXIN) `number | string` OLA BİLƏR, AMMA `ProductPayload.category_id` MÜTLƏQ `number` OLMALIDIR — `Number(...)` BU ÇEVRİLMƏNİ TƏMİN EDİR VƏ TypeScript-Ə "BU ARTIQ RƏQƏMDİR" DEYİR.

### `src/lib/adapters/user.ts` (ən SADƏSİ)

```ts
import type { User, UserApi } from '@/types/user'

export const mapUserFromApi = (u: UserApi): User => ({
  id: u.id,
  initial: (u.full_name || '?').charAt(0).toUpperCase(),
  color: '#22c55e',
  name: u.full_name,
  phone: u.phone,
  address: u.address || 'Qeyd olunmayıb',
  role: u.role,
})
```
`initial: (u.full_name || '?').charAt(0).toUpperCase()` — İSTİFADƏÇİNİN adının BİRİNCİ HƏRFİNİ (avatar üçün) ÇIXARIR: `u.full_name || '?'` (ad YOXDURSA "?" işarəsi), `.charAt(0)` (BİRİNCİ SİMVOLU götürür), `.toUpperCase()` (BÖYÜK hərfə çevirir). Bu faylda `mapUserToApi` YOXDUR — çünki İstifadəçilər səhifəsi READ-ONLY-dir (yaratmaq/silmək YOXDUR), API-yə HEÇ NƏ GÖNDƏRİLMİR (ONA GÖRƏ `src/types/user.ts`-DƏ DƏ `UserForm`/`UserPayload` TİPLƏRİ YOXDUR — YALNIZ `UserApi` VƏ `User`).

---

## Hissə 11: Sabitlər

### `src/lib/constants/productTypes.ts`

```ts
import type { BadgeColor } from '@/types/common'

export const PRODUCT_TYPE_LABELS = {
  kg: 'Kiloqram',
  gr: 'Qram',
  litre: 'Litr',
  ml: 'Millilitr',
  meter: 'Metr',
  cm: 'Santimetr',
  mm: 'Millimetr',
  piece: 'Ədəd',
  packet: 'Paket',
  box: 'Qutu',
} as const

export type ProductType = keyof typeof PRODUCT_TYPE_LABELS

export const PRODUCT_TYPE_OPTIONS = Object.keys(PRODUCT_TYPE_LABELS) as ProductType[]

const WEIGHT_BASED_TYPES: ProductType[] = ['kg', 'gr', 'litre', 'ml']

export const productTypeBadgeColor = (type: ProductType): BadgeColor =>
  WEIGHT_BASED_TYPES.includes(type) ? 'purple' : 'green'
```
- `PRODUCT_TYPE_LABELS = { ... } as const` — API-nin ENUM DƏYƏRLƏRİNİ (`"kg"`, `"piece"` və s.) Azərbaycanca ETİKETLƏRƏ (`"Kiloqram"`, `"Ədəd"`) BAĞLAYAN xəritə (obyekt). `as const` — Hissə 3-DƏ İZAH OLUNDU: BU OBYEKTİ "SABİT" EDİR Kİ, AŞAĞIDAKI `keyof typeof` TRİKİ İŞLƏSİN.
- `export type ProductType = keyof typeof PRODUCT_TYPE_LABELS` — Hissə 3-DƏKİ `keyof typeof`-A BAXIN: `PRODUCT_TYPE_LABELS`-IN 10 AÇARINDAN (`'kg' | 'gr' | ... | 'box'`) İBARƏT BİR UNION TİPİ YARADIR — BU LAYİHƏNİN İKİNCİ (`OrderStatus`-DAN SONRA) BÖYÜK "ENUM" TİPİDİR.
- `Object.keys(PRODUCT_TYPE_LABELS) as ProductType[]` — obyektin BÜTÜN AÇARLARINI (`['kg', 'gr', 'litre', ...]`) MASSİV kimi qaytarır. `as ProductType[]` LAZIMDIR, ÇÜNKİ `Object.keys(...)`-İN ÖZ TİPİ HƏMİŞƏ SADƏ `string[]`-DİR (TypeScript, OBYEKTİN AÇARLARININ DƏQİQ NƏ OLDUĞUNU RUNTIME-DA "İZLƏYƏ" BİLMİR) — BİZ İSƏ BİLİRİK Kİ, BU KONKRET HALDA NƏTİCƏ MƏHZ `ProductType[]`-DİR. Bu, FORMDAKI `<select>`-in `<option>`-larını YARATMAQ üçün istifadə OLUNUR.
- `WEIGHT_BASED_TYPES.includes(type)` — `.includes(...)` bir massivin MÜƏYYƏN dəyəri EHTİVA edib-etmədiyini yoxlayır (`true`/`false`).
- `productTypeBadgeColor(type: ProductType): BadgeColor` — BİR OX FUNKSİYASI, `type` PARAMETRİNƏ GÖRƏ BADGE RƏNGİNİ ("purple" — çəki əsaslı ölçülər üçün, ya "green" — say əsaslı ölçülər üçün) QAYTARIR. QAYTARILAN TİP `BadgeColor`-DUR (Hissə 5-Ə BAXIN) — YƏNİ, BU FUNKSİYA YALNIZ 5 MÜMKÜN RƏNGDƏN BİRİNİ QAYTARA BİLƏR, İSTƏNİLƏN STRİNG YOX.

### `src/lib/constants/orderStatus.ts`

```ts
import type { BadgeColor } from '@/types/common'

export const ORDER_STATUS_LABELS = {
  PENDING: 'Gözləyir',
  CONFIRMED: 'Təsdiqləndi',
  PREPARING: 'Hazırlanır',
  READY: 'Hazırdır',
  DELIVERED: 'Çatdırıldı',
  CANCELLED: 'Ləğv edildi',
} as const

export type OrderStatus = keyof typeof ORDER_STATUS_LABELS

export const ORDER_STATUS_BADGE_COLOR: Record<OrderStatus, BadgeColor> = {
  PENDING: 'amber',
  CONFIRMED: 'blue',
  PREPARING: 'purple',
  READY: 'blue',
  DELIVERED: 'green',
  CANCELLED: 'red',
}

export const ORDER_STATUS_OPTIONS = Object.keys(ORDER_STATUS_LABELS) as OrderStatus[]
```
YUXARIDAKI ilə EYNİ MƏNTİQ, sadəcə sifariş STATUSLARI üçün. **BİR FƏRQ VAR:** `ORDER_STATUS_BADGE_COLOR: Record<OrderStatus, BadgeColor>` — Hissə 3-DƏKİ `Record`-A BAXIN: BU YAZI SAYƏSİNDƏ, ƏGƏR GƏLƏCƏKDƏ `ORDER_STATUS_LABELS`-Ə YENİ BİR STATUS ƏLAVƏ EDİLSƏ (MƏS. `REFUNDED`), AMMA `ORDER_STATUS_BADGE_COLOR`-A ONUN RƏNGİ ƏLAVƏ EDİLMƏSƏ, TypeScript DƏRHAL XƏTA VERƏCƏK — "YENİ STATUSUN RƏNGİNİ UNUTMAQ" MÜMKÜN DEYİL.

### `src/lib/constants/userRole.ts` — ƏN SADƏ ENUM MİSALI

```ts
export const USER_ROLE_LABELS = {
  ADMIN: 'Admin',
  COMMERCE: 'Müştəri',
} as const

export type UserRole = keyof typeof USER_ROLE_LABELS
```
YUXARIDAKI İKİSİ İLƏ EYNİ PATTERN, AMMA DAHA SADƏDİR — YALNIZ İKİ MÜMKÜN DƏYƏR (`ADMIN`/`COMMERCE`, ÇÜNKİ BACKEND HƏQİQƏTƏN YALNIZ BU İKİSİNİ QAYTARIR) VƏ HEÇ BİR BADGE RƏNG XƏRİTƏSİ YOXDUR (`ORDER_STATUS_BADGE_COLOR`/`productTypeBadgeColor`-DAN FƏRQLİ OLARAQ) — ÇÜNKİ `Users.tsx`-DƏKİ ROL "BADGE"İ HƏMİŞƏ EYNİ (TƏK) RƏNGDƏDİR, RƏNGƏ GÖRƏ FƏRQLƏNDİRMƏYƏ EHTİYAC YOXDUR. `USER_ROLE_LABELS`-İN ÖZÜ İSTİFADƏ OLUNAN YER (`Users.tsx`-DƏ): `USER_ROLE_LABELS[user.role] ?? user.role` — CƏDVƏLDƏ VƏ DETAL MODALINDA, XAM `"ADMIN"`/`"COMMERCE"` (İNGİLİSCƏ) ƏVƏZİNƏ, AZƏRBAYCANCA `"Admin"`/`"Müştəri"` GÖSTƏRİLİR. `?? user.role` — Hissə 2-DƏKİ NULLISH COALESCING: NƏZƏRİ OLARAQ (`noUncheckedIndexedAccess` AYARINA GÖRƏ) LÜĞƏTDƏ TAPILMAYAN BİR ROL GƏLSƏ, ÖZ XAM DƏYƏRİ GÖSTƏRİLİR (BOŞ EKRAN ƏVƏZİNƏ).

**Bu, layihəyə SONRADAN ƏLAVƏ OLUNAN bir TƏKMİLLƏŞDİRMƏDİR** — İLK VERSİYADA `User.role` sadəcə `string` İDİ VƏ `Users.tsx` ONU XAM (İNGİLİSCƏ) GÖSTƏRİRDİ, HALBUKİ `OrderStatus`/`ProductType` ARTIQ TAM AZƏRBAYCANCA ETİKETLƏNMİŞDİ — BU UYĞUNSUZLUQ AŞKARLANIB, EYNİ PATTERN `role`-A DA TƏTBİQ EDİLİB.

---

## Hissə 12: `formatDate.ts`

**Fayl yolu**: `src/utils/FormatDate/formatDate.ts` (yanında `index.ts`: `export { formatDate } from './formatDate'`) — Hissə 4-DƏ QEYD OLUNAN KONVENSİYAYA GÖRƏ, HƏTTA BU KİMİ SADƏ, KOMPONENT OLMAYAN BİR FUNKSİYA BELƏ ÖZ QOVLUĞUNDA (`FormatDate/`) SAXLANILIR, BAŞQA YERLƏR ONU `@/utils/FormatDate` (FAYL ADINI TƏKRARLAMADAN) İDXAL EDİR.

```ts
export function formatDate(isoString?: string | null): string {
  if (!isoString) return ''
  const d = new Date(isoString)
  return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`
}
```
- `formatDate(isoString?: string | null): string` — PARAMETRİN TİPİ `string | null` (Hissə 3-DƏKİ UNION), ÜSTƏLİK `?` DA VAR (OPSİONAL — HEÇ VERİLMƏYƏ DƏ BİLƏR, `undefined` OLA BİLƏR). YƏNİ, `isoString` ÜÇ MÜXTƏLİF "BOŞ" HALDAN BİRİNDƏ OLA BİLƏR: `null`, `undefined`, YA DA BOŞ STRİNG (`''`) — HƏR ÜÇÜNÜ DƏ `if (!isoString)` YOXLAMASI TUTUR (Hissə 2-DƏKİ "FALSY" DƏYƏRLƏRƏ BAXIN). Bu genişlik, ÇAĞIRAN TƏRƏFLƏRDƏ (MƏS. `OrderApi.createdAt` HƏMİŞƏ VAR, AMMA BƏZİ BAŞQA RESURSLARDA TARİX SAHƏSİ NƏZƏRİ OLARAQ BOŞ OLA BİLƏR) RAHATLIQ ÜÇÜNDÜR.
- `if (!isoString) return ''` — TARIX VERİLMƏYİBSƏ (`null`/`undefined`/boş), BOŞ STRİNG QAYTAR (aşağıdakı sətirlər İŞLƏMƏSİN, xəta versin deyə).
- `new Date(isoString)` — API-DƏN GƏLƏN ISO string-i (`"2025-06-12T05:37:56.753Z"`) JavaScript-in daxili `Date` OBYEKTİNƏ çevirir.
- `d.getDate()` — AYIN günü (1-31), `d.getMonth()` — AY (DİQQƏT: 0-DAN başlayır! Yanvar=0, Dekabr=11 — ONA GÖRƏ `+ 1` ƏLAVƏ OLUNUB), `d.getFullYear()` — İL (4 rəqəmli).
- `String(...).padStart(2, '0')` — RƏQƏMİ STRİNGƏ çevirir, sonra `padStart(2, '0')` ilə SOLDAN "0" ilə DOLDURUR ki, HƏMİŞƏ 2 RƏQƏM olsun (`5` → `"05"`, `12` → `"12"`).
- Nəticə: `"12.06.2025"` formatında bir STRİNG (funksiyanın `: string` VƏDİNƏ UYĞUN).

---

## Hissə 13: TanStack Query

### `src/lib/queryClient.ts`

**TanStack Query nə üçündür?** Serverdən data ÇƏKMƏK (fetch), onu YADDAŞDA (cache) SAXLAMAQ, KÖHNƏLƏNDƏ YENİLƏMƏK, YÜKLƏNMƏ/XƏTA vəziyyətlərini İDARƏ ETMƏK — bunların HAMISINI ƏL İLƏ (`useState`+`useEffect` ilə) yazmaq ƏVƏZİNƏ, bu kitabxana HAZIR HƏLL TƏQDİM EDİR.

```ts
import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query'
import { toast } from 'sonner'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 15_000 },
  },
  queryCache: new QueryCache({
    onError: (err) => toast.error(err.message),
  }),
  mutationCache: new MutationCache({
    onError: (err) => toast.error(err.message),
  }),
})
```

**Sətir-sətir:**
- `new QueryClient({...})` — `new` ACHAR SÖZÜ ilə BİR "SİNİF"DƏN (class) YENİ BİR OBYEKT (instans) YARADILIR — `QueryClient` BÜTÜN CACHE-i VƏ AYARLARI SAXLAYAN "BEYİNDİR".
- `defaultOptions.queries.staleTime: 15_000` — `15_000` = 15000 (JavaScript-də ƏDƏDLƏRİN İÇİNDƏ `_` OXUNUŞU ASANLAŞDIRMAQ ÜÇÜN İŞLƏDİLİR, HEÇ BİR RİYAZİ MƏNASI YOXDUR — sadəcə 15000 MİLLİSANİYƏ = 15 SANİYƏ). `staleTime` — BİR DATA ÇƏKİLDİKDƏN SONRA NƏ QƏDƏR MÜDDƏT "TƏZƏ" (fresh) SAYILSIN. 15 SANİYƏ ƏRZİNDƏ EYNİ SƏHİFƏYƏ GERİ QAYITSANIZ, YENİDƏN SORĞU GETMİR, CACHE-DƏKİ DATA GÖSTƏRİLİR.
- `queryCache: new QueryCache({ onError: (err) => toast.error(err.message) })` — BÜTÜN `useQuery` (data OXUMA) sorğuları ÜÇÜN QLOBAL BİR XƏTA-TUTUCU. İSTƏNİLƏN SƏHİFƏDƏ İSTƏNİLƏN `useQuery` XƏTA VERSƏ, BU FUNKSİYA İŞƏ DÜŞÜR, `toast.error(...)` İLƏ BİLDİRİŞ GÖSTƏRİR — HƏR SƏHİFƏDƏ AYRI-AYRI XƏTA İDARƏ ETMƏYƏ EHTİYAC QALMIR. **DİQQƏT — BURADA `err.message` YAZILIB, `err instanceof Error ? ... : ...` YOX** (`Login/hooks/useLoginForm.ts`-DƏKİNDƏN FƏRQLİ OLARAQ): BUNUN SƏBƏBİ, `err`-İN TİPİNİN BURADA (TANSTACK QUERY-NİN ÖZ TİPLƏRİNƏ GÖRƏ) ARTIQ `unknown` YOX, BİRBAŞA `Error` KİMİ "İNFER" OLUNMASIDIR (TanStack Query-nin DAXİLİ TİPLƏRİ, `DefaultError = Error` DEYƏ SABİTLƏŞDİRİB) — Hissə 3-DƏKİ `catch (err)` MİSALINDAN FƏRQLİ OLARAQ, BURADA ƏLAVƏ DARALTMAYA EHTİYAC YOXDUR.
- `mutationCache: new MutationCache({ onError: ... })` — EYNİ MƏNTİQ, AMMA `useMutation` (data YAZMA — yaratma/yeniləmə/silmə) ÜÇÜN.

Bu `queryClient` obyekti `App.tsx`-də `<QueryClientProvider client={queryClient}>` İLƏ TƏTBİQƏ "TANIDILIR" (yuxarıda görmüşdük).

---

## Hissə 14: Shared komponentlər

Bu bölmədəki HAMISI `src/shared/components/` qovluğundadır (DİQQƏT: ARTIQ `shared/`-in BİRBAŞA İÇİNDƏ YOX, `components/` ALT-QOVLUĞUNDA — Hissə 4-Ə BAXIN) — TƏTBİQİN İSTƏNİLƏN YERİNDƏ TƏKRAR İSTİFADƏ OLUNAN, "AĞILLI" (data ilə işləməyən, sadəcə görünüş) komponentlərdir.

**ÜMUMİ QEYD, BÜTÜN AŞAĞIDAKI 10 KOMPONENTƏ AİDDİR:** Hər birinin `interface XProps {...}` TƏRİFİ ARTIQ ÖZ `.tsx` FAYLINDA DEYİL — Hissə 5-dəki `types/shared/`-ə keçidlə HAMISI `types/shared/XProps.ts`-ə DAŞINIB (`import type { ButtonProps } from '@/types/shared'` ŞƏKLİNDƏ İDXAL OLUNUR). Aşağıdakı kod nümunələrinin BİR HİSSƏSİ (Button, Table) BUNU AÇIQ GÖSTƏRİR — QALANLARDA (Modal, ConfirmModal, Badge, StatCard, Thumbnail, ActionMenu, Loading, ErrorBoundary) İSƏ, TƏKRARA DÜŞMƏMƏK ÜÇÜN, `interface` TƏRİFİ HƏLƏ DƏ (İZAH MƏQSƏDİLƏ) KOMPONENTİN ÖZÜ İLƏ BİRLİKDƏ GÖSTƏRİLİR — SADƏCƏ BİLİN Kİ, HAZIRKI KODDA O SƏTİRLƏR ARTIQ ORADA DEYİL, `types/shared/`-DƏDİR.

**Hər qovluqda BİR `index.ts` var** — MƏSƏLƏN `Button/index.ts`:
```ts
export { default } from './Button'
```
Bu, SADƏCƏ, `Button.tsx`-İN ÖZ "DEFAULT EXPORT"-UNU YENİDƏN İXRAC EDİR — NƏTİCƏDƏ BAŞQA FAYLLAR `import Button from '@/shared/components/Button/Button'` YOX, `import Button from '@/shared/components/Button'` YAZA BİLİR (FAYL ADI QOVLUQ ADINDA TƏKRARLANMIR). `Table/index.ts` KİMİ BƏZİ QOVLUQLARDA BUNDAN BİR AZ FƏRQLİ BİR YAZI VAR (`export { default, Table, TableEmptyRow } from './Table'`) — ÇÜNKİ O FAYL BİRDƏN ÇOX ŞEY İXRAC EDİR (Hissə 14-DƏ, `Table.tsx`-İN ÖZ İZAHINDA GÖRƏCƏYİK). **DİQQƏT — BU, HƏR QOVLUQ ÜÇÜN AYRI-AYRI BİR `index.ts`DİR, YƏNİ `shared/components/`-İN ÖZÜNDƏ BÜTÜN KOMPONENTLƏRİ BİR YERƏ TOPLAYAN TƏK BİR MƏRKƏZİ `index.ts` YOXDUR** — BU, BİLƏRƏKDƏN BELƏDİR: HƏR KOMPONENT ÖZ `.module.css`-İNİ DƏ İDXAL ETDİYİ ÜÇÜN (BU, "YAN TƏSİRLİ" BİR İDXALDIR), TƏK BİR NÖV "HAMISINI-BİR-YERƏ-YIĞAN" FAYL OLSAYDI, VITE-İN BUNDLE-DAN İSTİFADƏ OLUNMAYAN KOMPONENTLƏRİ "ATMASI" (TREE-SHAKING) ÇƏTİNLƏŞƏRDİ — BİR SƏHİFƏ TƏKCƏ `Modal`+`Button` İSTİFADƏ ETSƏ BELƏ, O MƏRKƏZİ FAYLDAN İDXAL ETSƏYDİ, BÜTÜN DİGƏR KOMPONENTLƏR DƏ (İSTİFADƏ OLUNMASA BELƏ) EYNİ JS PARÇASINA (CHUNK) DÜŞƏ BİLƏRDİ.

### `Button.tsx`

**DİQQƏT — `interface ButtonProps` ARTIQ BU FAYLDA DEYİL:** Aşağıdakı kod, TİPİN HARADA TƏYİN OLUNDUĞUNU GÖSTƏRMƏK ÜÇÜN, HƏLƏ DƏ ƏVVƏLKİ (KOMPONENTLƏ EYNİ FAYLDA) FORMADA VERİLİB, AMMA HAZIRKI KODDA BU İNTERFEYS `types/shared/ButtonProps.ts`-DƏDİR VƏ BURADA SADƏCƏ `import type { ButtonProps } from '@/types/shared'` YAZILIR — SƏBƏBİ Hissə 5-in "types/shared/" bölməsində izah olunub.

```tsx
import type { ComponentPropsWithRef } from 'react'
import type { IconComponent } from '@/types/common'
import styles from './Button.module.css'

interface ButtonProps extends ComponentPropsWithRef<'button'> {
  variant?: 'solid' | 'outline' | 'ghost' | 'ghostDanger'
  icon?: IconComponent
  iconSize?: number
  fullWidth?: boolean
  block?: boolean
}

export default function Button({
  variant = 'solid',
  icon: Icon,
  iconSize = 16,
  fullWidth = false,
  block = false,
  className = '',
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  const classes = [
    styles.btn,
    styles[variant],
    fullWidth ? styles.fullWidth : '',
    block ? styles.block : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={classes} {...rest}>
      {Icon && <Icon size={iconSize} />}
      {children}
    </button>
  )
}
```
- `interface ButtonProps extends ComponentPropsWithRef<'button'> { ... }` — Hissə 3-DƏ ƏTRAFLI İZAH OLUNDU: `ButtonProps`, ADİ `<button>` ELEMENTİNİN BÜTÜN PROP-LARINI (`onClick`, `disabled`, `ref` VƏ S.) "MİRAS ALIR", ÜSTÜNƏ ÖZ 5 ƏLAVƏ PROP-UNU (`variant`, `icon`, `iconSize`, `fullWidth`, `block`) ƏLAVƏ EDİR — HAMISI `?` İLƏ (OPSİONAL), ÇÜNKİ HAMISININ DEFAULT DƏYƏRİ VAR.
- `variant?: 'solid' | 'outline' | 'ghost' | 'ghostDanger'` — Hissə 3-DƏKİ UNION TİP: `Button`-UN DİZAYNDA DƏSTƏKLƏDİYİ 4 GÖRÜNÜŞ VARIANTI (`Button.module.css`-DƏKİ 4 KLASA UYĞUN GƏLİR) — BAŞQA HEÇ BİR MƏTN QƏBUL OLUNMUR (`<Button variant="qırmızı">` YAZSANIZ, TypeScript XƏTA VERƏR).
- `icon?: IconComponent` — Hissə 5-DƏKİ `IconComponent` TİPİ: "BU, `lucide-react`-DAN GƏLƏN, `size`/`color` QƏBUL EDƏN BİR KOMPONENTDİR" DEMƏKDİR.
- `variant = 'solid'` — DESTRUCTURING zamanı `=` İLƏ **DEFAULT DƏYƏR** TƏYİN OLUNUR: `<Button>` İSTİFADƏ EDƏNDƏ `variant` PROP-UNU VERMƏSƏNİZ, AVTOMATİK `'solid'` OLUR.
- `icon: Icon` — DESTRUCTURING İLƏ EYNİ ZAMANDA **YENİDƏN ADLANDIRMA**: PROP-UN ADI `icon`-DUR, AMMA BİZ ONU YEREL DƏYİŞƏN KİMİ `Icon` (BÖYÜK HƏRFLƏ) ADLANDIRIRIQ — ÇÜNKİ JSX-DƏ `<Icon/>` YAZMAQ ÜÇÜN DƏYİŞƏN BÖYÜK HƏRFLƏ BAŞLAMALIDIR (React KİÇİK HƏRFLƏ BAŞLAYANLARI ADİ HTML TEQİ SANIR).
- `...rest` — YUXARIDA İZAH OLUNAN "REST" — `variant`, `icon`, `iconSize` VƏ S. ÇIXARILDIQDAN SONRA, QALAN BÜTÜN PROP-LAR (`onClick`, `disabled`, HƏTTA `ref` DAXİL) `rest` OBYEKTİNƏ YIĞILIR. `ButtonProps`-UN `ComponentPropsWithRef<'button'>`-DAN "MİRAS ALDIĞI" ÜÇÜN, `rest`-İN TİPİ AVTOMATİK OLARAQ DOĞRU (BÜTÜN QALAN BUTTON PROP-LARI) OLUR.
- `classes = [...].filter(Boolean).join(' ')` — BİR NEÇƏ CSS KLASINI ŞƏRTİ OLARAQ BİRLƏŞDİRMƏK ÜÇÜN ÜMUMİ TRİK: MASSİV QURULUR (BƏZİ ELEMENTLƏR BOŞ STRİNG `''` OLA BİLƏR), `.filter(Boolean)` BOŞ STRİNGLƏRİ MASSİVDƏN ÇIXARIR, `.join(' ')` QALANLARI BOŞLUQLA BİRLƏŞDİRİB TƏK STRİNG EDİR.
- `<button type={type} className={classes} {...rest}>` — `{...rest}` BURADA DA SPREAD-DİR, AMMA JSX DAXİLİNDƏ: `rest` OBYEKTİNDƏKİ HƏR AÇAR-DƏYƏRİ BU ELEMENTƏ AYRI-AYRI PROP KİMİ "TÖKÜR".
- `{Icon && <Icon size={iconSize} />}` — `Icon` PROP-U VERİLİBSƏ (İKON KOMPONENTİDİRSƏ), ONU RENDER ET, VERİLMƏYİBSƏ (`undefined`-DURSA) HEÇ NƏ GÖSTƏRMƏ.

**`ref={cancelBtnRef}` KİMİ İSTİFADƏ NECƏ MÜMKÜNDÜR, HALBUKI `Button` "ADİ" BİR FUNKSİYA KOMPONENTDİR?** Köhnə React versiyalarında, BİR FUNKSİYA KOMPONENTİN `ref` QƏBUL ETMƏSİ ÜÇÜN, ONU XÜSUSİ BİR `forwardRef(...)` FUNKSİYASI İLƏ "SARMAQ" LAZIM İDİ. **React 19-DA BU ARTIQ LAZIM DEYİL** — `ref`, ADİ BİR PROP KİMİ QƏBUL OLUNA BİLƏR, TƏKCƏ TİP SƏVİYYƏSİNDƏ `ComponentPropsWithRef<'button'>`-DAN "MİRAS ALMAQ" KİFAYƏTDİR (Hissə 3-Ə BAXIN) Kİ, TypeScript BUNU "TANISIN".

### `Modal.tsx`

```tsx
import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import styles from './Modal.module.css'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children?: ReactNode
  wide?: boolean
  className?: string
}

export default function Modal({ open, onClose, title, children, wide = false, className = '' }: ModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    closeBtnRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className={styles.overlay}>
      <div className={`${styles.card} ${wide ? styles.cardWide : ''} ${className}`} role="dialog" aria-modal="true" aria-label={title}>
        <div className={styles.header}>
          {title ? <h3 className={styles.title}>{title}</h3> : <div />}
          <button type="button" ref={closeBtnRef} onClick={onClose} className={styles.closeBtn} aria-label="Bağla">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
```
- `interface ModalProps { open: boolean; onClose: () => void; title?: string; children?: ReactNode; wide?: boolean; className?: string }` — `open`/`onClose` MÜTLƏQDİR (`?` YOXDUR — HƏR ÇAĞIRIŞDA VERİLMƏLİDİR), `title`/`children`/`wide`/`className` İSƏ OPSİONALDIR.
- **`className` — SONRADAN ƏLAVƏ OLUNUB, KONKRET SƏBƏBLƏ:** `Orders`-in detal modalı (aşağıda, Hissə 18-in Orders bölməsində) digər bütün modallardan (Categories/Products/Campaigns) DAHA GENİŞ OLMALI İDİ, AMMA `wide` PROP-U ARTIQ `.cardWide` (560px) SİNİFİNƏ BAĞLIDIR — O SİNİFİ BÖYÜTSƏYDİK, BÜTÜN `wide` MODALLAR (Kateqoriya/Məhsul/Kampaniya detalı + Məhsul forması) EYNI ANDA BÖYÜYƏRDİ, HALBUKI YALNIZ Orders-in özünü böyütmək istənilirdi. Bunun üçün `Modal`-a bir `className?: string` prop-u əlavə edildi — `Modal.tsx` ONU `styles.card`/`styles.cardWide`-DAN SONRA class siyahısına ƏLAVƏ EDİR (`${styles.card} ${wide ? styles.cardWide : ''} ${className}`), `OrderDetails.tsx` İSƏ ÖZ `styles.wideModal` (`{ max-width: 660px }`) SİNİFİNİ BU PROP VASİTƏSİLƏ ÖTÜRÜR — BELƏLİKLƏ YALNIZ Orders-in modalı geniş olur, QALANLARI 560px-DƏ QALIR.
- **`.card`-A `max-height: calc(100vh - 32px)` + `overflow-y: auto` ƏLAVƏ OLUNUB, SCROLLBAR İSƏ GİZLƏDİLİB (`scrollbar-width: none` + `::-webkit-scrollbar{display:none}`, `Table`-in `.scroll`-U İLƏ EYNİ TEXNİKA):** SƏBƏB, YENƏ Orders-in DETAL MODALI — HERO KART + 4 MƏLUMAT SƏTRİ + MƏHSUL SİYAHISI KİMİ ÇOX MƏZMUN DAŞIYIR, VƏ ƏVVƏLLƏR (BU DƏYİŞİKLİKDƏN QABAQ) MODAL ADİ VİEWPORT-DA EKRANDAN DAŞIB, HEÇ BİR SCROLL YOLU OLMADAN, SADƏCƏ KƏSİLİRDİ. SCROLL EDİLƏ BİLİR, SADƏCƏ VİZUAL OLARAQ GÖRÜNMÜR — FUNKSİONALLIQ İTMİR, YALNIZ SCROLLBAR "İZİ" YOXA ÇIXIR.
- `useRef<HTMLButtonElement>(null)` — Hissə 3-DƏKİ GENERİK SİNTAKSİS BURADA DA VAR: "`closeBtnRef`, GƏLƏCƏKDƏ BİR `<button>` DOM ELEMENTİNƏ İŞARƏ EDƏCƏK" DEMƏKDİR. BAŞLANĞICDA `null` (HEÇ BİR ELEMENTƏ QOŞULMAYIB), AMMA `ref={closeBtnRef}` DÜYMƏYƏ VERİLDİKDƏN SONRA, `closeBtnRef.current`-İN TİPİ `HTMLButtonElement | null` OLUR — TypeScript BUNU BİLDİYİ ÜÇÜN, `closeBtnRef.current?.focus()` YAZANDA, `.focus()` METODUNUN DOĞRUDAN DA `HTMLButtonElement`-DƏ MÖVCUD OLDUĞUNU YOXLAYA BİLİR (MƏSƏLƏN, SƏHVƏN `.focusS()` YAZSANIZ, XƏTA TUTULAR).
- `useEffect(() => {...}, [open])` VƏ İKİNCİ `useEffect(() => {...}, [open, onClose])` — Hissə 2-DƏ İZAH OLUNAN İKİ AYRI EFFEKT (BİRİ FOKUSLAMA ÜÇÜN, DİGƏRİ `Escape` DİNLƏYİCİSİ ÜÇÜN) — NİYƏ İKİ AYRI EFFEKTƏ BÖLÜNDÜYÜ (BİRLƏŞDİRİLƏ DƏ BİLƏRDİ) BİR LAYİHƏ QƏRARIDIR: `onClose` FUNKSİYASI HƏR RENDER-DƏ YENİ BİR REFERANS OLA BİLƏR (VALIDEYN KOMPONENTDƏ `() => setFormOpen(false)` KİMİ İNLİNE YAZILDIQDA), BU İSƏ FOKUSLAMA EFFEKTİNİ TƏKRAR-TƏKRAR İŞƏ SALARDI (VƏ MODAL AÇIQ İKƏN, İSTİFADƏÇİ BAŞQA BİR İNPUTA YAZARKƏN, FOKUS SƏHVƏN GERİ BAĞLAMA DÜYMƏSİNƏ QAYIDARDI) — AYRI EFFEKTLƏR BU PROBLEMİN QARŞISINI ALIR.
  - `handleKeyDown = (e: KeyboardEvent) => {...}` — `e: KeyboardEvent`, BRAUZERİN ÖZ TİPİDİR ("BİR KLAVİATURA HADİSƏSİ" DEMƏKDİR), `e.key === 'Escape'` YOXLAMASININ DÜZGÜN İŞLƏMƏSİ ÜÇÜN LAZIMDIR.
- `if (!open) return null` — MODAL BAĞLIDIRSA, HEÇ NƏ RENDER ETMİR.
- `{title ? <h3>...</h3> : <div />}` — BAŞLIQ VERİLİBSƏ GÖSTƏR, VERİLMƏYİBSƏ BOŞ BİR `<div/>` QOY (YERLƏŞMƏ POZULMASIN DEYƏ).
- `{children}` — `<Modal>...BURADA...</Modal>` YAZILANDA, İÇİNDƏKİ HƏR ŞEY `children` PROP-U KİMİ GƏLİR VƏ BURADA RENDER OLUNUR.

### `ConfirmModal.tsx`

`Modal.tsx` İLƏ EYNİ MƏNTİQ (ESCAPE, FOKUS), AMMA AYRICA, DAHA SADƏ BİR KOMPONENTDİR — "ƏMİNSİNİZMİ?" TİPLİ SUALLAR ÜÇÜN:
```ts
interface ConfirmModalProps {
  open: boolean
  onCancel: () => void
  onConfirm: () => void
  message: string
}
```
FƏRQİ: `role="alertdialog"` (ADİ DİALOQ DEYİL, XƏBƏRDARLIQ DİALOQU) VƏ `<Button ref={cancelBtnRef}>` — BURADA `Button`-UN YUXARIDA İZAH OLUNAN `ComponentPropsWithRef` XÜSUSİYYƏTİ İSTİFADƏ OLUNUR: `Button` ADİ FUNKSİYA KOMPONENTİDİR (`forwardRef`-SİZ), AMMA REACT 19 + `ComponentPropsWithRef<'button'>` SAYƏSİNDƏ `ref`-İ BİLƏVASİTƏ QƏBUL EDƏ BİLİR VƏ `...rest`-İN İÇİNDƏ `<button>`-Ə ÖTÜRÜLÜR.

### `Badge.tsx`

```tsx
import type { ReactNode } from 'react'
import type { BadgeColor } from '@/types/common'
import styles from './Badge.module.css'

interface BadgeProps {
  color?: BadgeColor
  children: ReactNode
}

export default function Badge({ color = 'green', children }: BadgeProps) {
  return <span className={`${styles.badge} ${styles[color]}`}>{children}</span>
}
```
`color?: BadgeColor` — Hissə 5-DƏKİ `BadgeColor` UNION TİPİ (`'green' | 'blue' | 'amber' | 'purple' | 'red'`) — BURADA, `ORDER_STATUS_BADGE_COLOR`-DA, VƏ `productTypeBadgeColor`-UN QAYTARDIĞI DƏYƏRDƏ **EYNİ TİP** İSTİFADƏ OLUNUR (Hissə 5-Ə BAXIN) — YƏNİ, ƏGƏR BİRİSİ SƏHVƏN "YELLOW" (BU 5 RƏNGDƏ OLMAYAN BİR RƏNG) YAZSA, İSTƏR `Badge`-Ə BİRBAŞA PROP KİMİ, İSTƏRSƏ DƏ `ORDER_STATUS_BADGE_COLOR`-UN İÇİNDƏ, TypeScript EYNİ ANDA TUTAR. `styles[color]` — DİNAMİK KLAS SEÇİMİ: `color` PROP-U `"green"`, `"blue"`, `"amber"` VƏ S. OLA BİLƏR, `styles[color]` HƏMİN ADLI CSS KLASINI OXUYUR.

### `StatCard.tsx`

```tsx
import type { ReactNode } from 'react'
import type { IconComponent } from '@/types/common'
import styles from './StatCard.module.css'

interface StatCardProps {
  label: ReactNode
  value: ReactNode
  icon: IconComponent
  color: string
}

export default function StatCard({ label, value, icon: Icon, color }: StatCardProps) {
  return (
    <div className={styles.card}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>
        <Icon size={16} color={color} />
        {value}
      </span>
    </div>
  )
}
```
SADƏ BİR "KART" — ETİKET (`label`), RƏQƏM (`value`) VƏ RƏNGLİ İKON GÖSTƏRİR. `icon: IconComponent` — DİQQƏT, `Button`-DAN FƏRQLİ OLARAQ, BURADA `icon` **OPSİONAL DEYİL** (`?` YOXDUR) — ÇÜNKİ `StatCard` HEÇ VAXT İKONSUZ İSTİFADƏ OLUNMUR, ONA GÖRƏ TİP DƏ BUNU "MƏCBURİ" EDİR (İKONSUZ ÇAĞIRSANIZ, TypeScript XƏTA VERƏR — BU, RUNTIME-DA "İKON UNDEFINED-DIR" DEYƏ ÇÖKMƏNİN QARŞISINI ƏVVƏLCƏDƏN ALIR). ORDERS SƏHİFƏSİNDƏKİ 6 STATİSTİKA KARTI BUNDAN İSTİFADƏ EDİR.

### `Thumbnail.tsx`

```tsx
import type { ReactNode } from 'react'
import { resizeThumbnailUrl } from '@/utils/ResizeThumbnailUrl'
import styles from './Thumbnail.module.css'

interface ThumbnailProps {
  imageUrl?: string
  image?: ReactNode
  color?: string
  size?: 'sm' | 'lg'
}

const PIXEL_SIZE: Record<NonNullable<ThumbnailProps['size']>, number> = { sm: 40, lg: 56 }

export default function Thumbnail({ imageUrl, image, color, size = 'sm' }: ThumbnailProps) {
  const pixelSize = PIXEL_SIZE[size]

  return (
    <span className={`${styles.thumb} ${styles[size]}`} style={{ backgroundColor: color }}>
      {imageUrl ? (
        <img
          src={resizeThumbnailUrl(imageUrl, pixelSize * 2)}
          alt=""
          width={pixelSize}
          height={pixelSize}
          loading="lazy"
          decoding="async"
          className={styles.img}
        />
      ) : (
        image
      )}
    </span>
  )
}
```
`size?: 'sm' | 'lg'` — İKİ ÖLÇÜ VARIANTI (Hissə 3-DƏKİ UNION), CƏDVƏL XANALARI ÜÇÜN `'sm'` (DEFAULT, 40px), DETAL MODALLARI ÜÇÜN `'lg'` (56px). `imageUrl ? <img .../> : image` — ƏSL ŞƏKİL ÜNVANI (`imageUrl`) VARSA `<img>` TEQİ İLƏ GÖSTƏRİR, YOXDURSA `image` (EMOJİ, MƏSƏLƏN "📦") MƏTN KİMİ GÖSTƏRİLİR.

**BU KOMPONENT SONRADAN, BİR REAL PERFORMANS PROBLEMİNİ HƏLL ETMƏK ÜÇÜN TƏKMİLLƏŞDİRİLDİ** — İSTİFADƏÇİ "Kampaniyalar/Kateqoriyalar/Məhsullar SƏHİFƏLƏRİNDƏKİ KİÇİK ŞƏKİLLƏRİN BİR AZ GECİKMƏSİNİ" HİSS ETDİ, VƏ SƏBƏB TAPILDI:

- **`PIXEL_SIZE: Record<NonNullable<ThumbnailProps['size']>, number> = { sm: 40, lg: 56 }`** — Hissə 3-DƏKİ `Record`-A BAXIN. **`NonNullable<ThumbnailProps['size']>`** İSƏ YENİ BİR TRİKDİR: `ThumbnailProps['size']` — "`ThumbnailProps` İNTERFEYSİNİN `size` SAHƏSİNİN TİPİNİ GÖTÜR" DEMƏKDİR (`'sm' | 'lg' | undefined`, ÇÜNKİ `size?:` OPSİONALDIR), `NonNullable<...>` İSƏ ONUN İÇİNDƏN `undefined`/`null`-U ÇIXARIR — NƏTİCƏDƏ `'sm' | 'lg'` (SADƏCƏ İKİ DƏYƏR) QALIR. BUNUN FAYDASI: `size` SAHƏSİNİN TİPİNİ `ThumbnailProps`-DA BİR DƏFƏ YAZIRIQ, `PIXEL_SIZE`-İN AÇARLARI ONDAN "TÖRƏYİR" — GƏLƏCƏKDƏ ÜÇÜNCÜ BİR ÖLÇÜ (MƏS. `'xl'`) ƏLAVƏ EDİLSƏ, `PIXEL_SIZE`-Ə ONUN PİKSEL DƏYƏRİNİ ƏLAVƏ ETMƏYİ UNUTSAQ, TypeScript DƏRHAL TUTAR (EYNİ MƏNTİQ, `Record<OrderStatus, BadgeColor>`-DA GÖRDÜYÜMÜZ KİMİ).
- **SƏBƏB NƏ İDİ?** BACKEND-İN `img_url`-U ARTIQ CLOUDFLARE-İN ÖZ "ŞƏKİL-ÖLÇÜLƏNDİRMƏ" XİDMƏTİNDƏN (Image Resizing) KEÇİR (`.../cdn-cgi/image/width=600,height=400,quality=80,format=auto/...jpg` FORMASINDA BİR URL), AMMA BU, **HƏMİŞƏ 600×400 ÖLÇÜSÜNDƏDİR** — HALBUKİ EKRANDA GÖSTƏRİLƏN THUMBNAIL CƏMİ 40×40 (VƏ YA 56×56) PİKSELDİR. YƏNİ, BRAUZER LAZIM OLANDAN ~60-75 DƏFƏ ARTIQ PİKSEL DATA ENDİRİB, SONRA ONU KİÇİLDİRDİ — BU, GECİKMƏNİN ƏSAS SƏBƏBİ İDİ.
- **`resizeThumbnailUrl(imageUrl, pixelSize * 2)`** — HƏLL BUDUR: `imageUrl`-DƏKİ CLOUDFLARE URL-İNİN `width=`/`height=` DƏYƏRLƏRİNİ, ƏSL GÖSTƏRİLƏN ÖLÇÜYƏ (RETİNA EKRANLAR ÜÇÜN `× 2`) UYĞUNLAŞDIRIR (AŞAĞIDA, ÖZ BÖLMƏSİNDƏ, FUNKSİYANIN ÖZÜ İZAH OLUNUR).
- **`width={pixelSize}` VƏ `height={pixelSize}`** — `<img>`-İN ÖZÜNDƏ DƏQİQ ÖLÇÜ ATRİBUTLARI: BRAUZERİN ŞƏKİL YÜKLƏNMƏZDƏN ƏVVƏL LAYOUT-DA YER "AYIRMASINA" (VƏ DAHA SÜRƏTLİ BİR DEKODLAMA YOLU SEÇMƏSİNƏ) KÖMƏK EDİR.
- **`loading="lazy"`** — BRAUZERİN ÖZ, DAXİLİ XÜSUSİYYƏTİDİR (HEÇ BİR JAVASCRIPT KİTABXANASI LAZIM DEYİL): ŞƏKİL EKRANDA GÖRÜNƏN SAHƏYƏ (VIEWPORT) YAXINLAŞANA QƏDƏR YÜKLƏNMİR — UZUN BİR CƏDVƏLDƏ, HƏLƏ SCROLL EDİLMƏMİŞ SƏTİRLƏRİN ŞƏKİLLƏRİ DƏRHAL YÜKLƏNMİR.
- **`decoding="async"`** — ŞƏKİLİN "DEKODLANMASI" (RƏNG DATASININ HAZIRLANMASI) ANA THREAD-İ (BROWSER-İN ÜMUMİ İŞLƏMƏ AXINI) BLOKLAMASIN DEYƏ, ASİNXRON APARILIR.

### `src/utils/ResizeThumbnailUrl/resizeThumbnailUrl.ts`

```ts
const CF_IMAGE_SEGMENT = /\/cdn-cgi\/image\/([^/]+)\//

export function resizeThumbnailUrl(url: string, size: number): string {
  return url.replace(CF_IMAGE_SEGMENT, (_match, params: string) => {
    const updated = params.replace(/width=\d+/, `width=${size}`).replace(/height=\d+/, `height=${size}`)
    return `/cdn-cgi/image/${updated}/`
  })
}
```
- **`CF_IMAGE_SEGMENT = /\/cdn-cgi\/image\/([^/]+)\//`** — BU, BİR **REGULAR EXPRESSION** (REGEX, "MƏTN NÜMUNƏSİ" AXTARAN XÜSUSİ BİR SİNTAKSİS)DİR: "`/cdn-cgi/image/` MƏTNİ, ARDINCA `/` OLMAYAN İSTƏNİLƏN SİMVOLLAR (`[^/]+`, MƏS. `width=600,height=400,quality=80,format=auto` — BUNU `params` KİMİ "TUTUR", MÖTƏRİZƏLƏR SAYƏSİNDƏ), ARDINCA YENƏ `/`" NÜMUNƏSİNƏ UYĞUN GƏLƏN HİSSƏNİ TAP.
- **`url.replace(CF_IMAGE_SEGMENT, (_match, params: string) => {...})`** — `.replace()`-İN İKİNCİ ARQUMENTİ ADİ BİR STRİNG DEYİL, BİR **FUNKSİYADIR** — REGEX UYĞUN GƏLƏN HİSSƏNİ, HƏMİN FUNKSİYANIN QAYTARDIĞI DƏYƏRLƏ ƏVƏZ EDİR. `_match` — TAPILAN BÜTÜN HİSSƏ (İSTİFADƏ OLUNMUR, ONA GÖRƏ `_` İLƏ BAŞLAYIR), `params` — MÖTƏRİZƏNİN "TUTDUĞU" HİSSƏ (`width=600,height=400,...`).
- `params.replace(/width=\d+/, \`width=${size}\`).replace(/height=\d+/, \`height=${size}\`)` — `params`-IN İÇİNDƏKİ `width=600` VƏ `height=400`-Ü, YALNIZ RƏQƏMLƏRİ DƏYİŞDİRƏRƏK (`quality=80,format=auto` KİMİ QALAN HİSSƏLƏRƏ TOXUNMADAN), YENİ `size` DƏYƏRİ İLƏ ƏVƏZ EDİR.
- **URL BU NÜMUNƏYƏ UYĞUN GƏLMİRSƏ (MƏS. BOŞ STRİNG, YA DA BAŞQA BİR SAYT-DAN GƏLƏN ADİ ŞƏKİL) NƏ OLUR?** `.replace()` HEÇ BİR UYĞUNLUQ TAPMASA, SADƏCƏ ORİJİNAL STRİNGİ DƏYİŞMƏDƏN QAYTARIR — YƏNİ, BU FUNKSİYA "TƏHLÜKƏSİZ"DİR, BAŞQA FORMATLI URL-LƏRƏ ZƏRƏR VERMİR.
- **Fayl yolu VƏ QOVLUQ KONVENSİYASI**: `src/utils/ResizeThumbnailUrl/resizeThumbnailUrl.ts` (+ `index.ts`: `export { resizeThumbnailUrl } from './resizeThumbnailUrl'`) — Hissə 4/12-DƏ GÖRDÜYÜMÜZ EYNİ QOVLUQ QAYDASI (`Pagination/`, `FormatDate/` İLƏ EYNİ NÖV).

### `FormField.tsx`, `FormInput.tsx`, `FormSelect.tsx`, `FormTextarea.tsx` — react-hook-form ilə birgə gələn 4 YENİ komponent

**HARADAN ÇIXDI BU DÖRDÜ?** `CategoryForm`/`ProductForm`/`CampaignForm`-un HƏR BİRİNDƏ, ƏVVƏLLƏR (Hissə 18-in köhnə "Categories.tsx" NÜMUNƏSİNDƏ GÖRDÜYÜNÜZ KİMİ), EYNİ 4-5 SƏTİRLİK NÜMUNƏ TƏKRARLANIRDI:
```tsx
<label className="flex flex-col gap-2">
  Ad
  <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required className={styles.input} />
</label>
```
FORMALAR `useState`-DƏN **react-hook-form**-A KEÇİRİLƏNDƏ (AŞAĞIDA, Hissə 18-DƏ, `CategoryForm.tsx`-İN TAM İZAHINA BAXIN), BU NÜMUNƏ DƏYİŞDİ, AMMA YENƏ ÜÇ FORMADA TƏKRARLANDI — ONA GÖRƏ, "LABEL + INPUT ÇÜTÜ" (`FormField` + `FormInput`), "LABEL + SELECT ÇÜTÜ" (`FormField` + `FormSelect`) VƏ "LABEL + TEXTAREA ÇÜTÜ" (`FormField` + `FormTextarea`) DÖRD KİÇİK, TƏKRAR İSTİFADƏ OLUNAN KOMPONENTƏ ÇIXARILDI:

```tsx
// FormField.tsx — sadəcə <label> + label mətni + içindəki hər-nə-olsa (children)
export default function FormField({ label, children }: FormFieldProps) {
  return (
    <label className={`flex flex-col gap-2 ${styles.field}`}>
      {label}
      {children}
    </label>
  )
}

// FormInput.tsx — adi <input>-in "stillənmiş" versiyası
type FormInputProps = ComponentPropsWithRef<'input'>
export default function FormInput({ className = '', type = 'text', ...rest }: FormInputProps) {
  return <input type={type} className={`${styles.input} ${className}`} {...rest} />
}
```
- **`FormField` NİYƏ AYRI, `FormInput`-UN ÖZÜNƏ BİRLƏŞDİRİLMƏYİB?** Çünki `FormField`, `FormInput`/`FormSelect`/`FormTextarea`-DAN HƏR HANSI BİRİNİN "ÜSTÜNDƏ" İŞLƏYİR (`children` PROP-U İLƏ — Hissə 2-Ə BAXIN) — BİR `FormField`, İÇİNDƏ EYNİ DƏRƏCƏDƏ RAHATLIQLA `<FormInput>`, `<FormSelect>` VƏ YA `<FormTextarea>` SAXLAYA BİLİR. Bunları TƏK BİR (MƏS. YALNIZ INPUT ÜÇÜN) KOMPONENTƏ BİRLƏŞDİRSƏYDİK, SELECT/TEXTAREA ÜÇÜN YENİDƏN "LABEL YAZMA" MƏNTİQİNİ TƏKRARLAMALI OLARDIQ.
- **`FormInput`/`FormSelect`/`FormTextarea` — NİYƏ `ComponentPropsWithRef<'input'>` (VƏ S.) TİPİNDƏN, ÖZ ƏLAVƏ PROP-U OLMADAN?** Hissə 3-dəki `ComponentPropsWithRef`-ə baxın — bu komponentlərin YEGANƏ VƏZİFƏSİ, HTML elementinin ÜZƏRİNƏ TƏK bir `styles.input`/`styles.select`/`styles.textarea` KLASI ƏLAVƏ ETMƏKDİR, QALAN HƏR ŞEY (`value`, `onChange`, HƏTTA react-hook-form-un `register(...)`-İN QAYTARDIĞI `ref`/`onBlur`/`name` DAXİL) `...rest` İLƏ OLDUĞU KİMİ ÖTÜRÜLÜR — Button-DA GÖRDÜYÜMÜZ EYNİ NÜMUNƏ (Hissə 14-ün yuxarısına baxın).
- **`register('name', { required: true })` NECƏ İŞLƏYİR BUNLARLA BİRLİKDƏ?** `register(...)`, react-hook-form-un QAYTARDIĞI OBYEKTDİR (`{ name, onChange, onBlur, ref }`) — `<FormInput {...register('imageUrl')} />` YAZILANDA, BU DÖRD SAHƏ `FormInput`-UN `...rest`-İNƏ DÜŞÜR VƏ BİRBAŞA `<input>`-A ÖTÜRÜLÜR. YƏNİ, `FormInput`-UN ÖZÜ REACT-HOOK-FORM-DAN TAMAMİLƏ XƏBƏRSİZDİR (heç bir react-hook-form idxalı YOXDUR) — bu, BİLƏRƏKDƏN BELƏDİR, Kİ `FormInput` GƏLƏCƏKDƏ REACT-HOOK-FORM-SUZ DA (SADƏ `value`/`onChange` İLƏ) İSTİFADƏ OLUNA BİLSİN.

**"BÖLMƏSƏYDİK NECƏ OLARDI?"** Hər formada `<input className={styles.input} {...register(...)} />` TƏKRARLAMAQ DA MÜMKÜN OLARDI (CƏMİ 3 FORMA VAR, TƏKRAR ÇOX BÖYÜK DEYİL) — AMMA BU DÖRD KOMPONENT ÇIXARILMASININ ƏSAS FAYDASI, GƏLƏCƏKDƏ (MƏS. 4-CÜ BİR FORMA ƏLAVƏ OLUNSA) EYNİ VİZUAL STİLİ (`.input`/`.select`/`.textarea` KLASLARI) TƏKRAR YAZMADAN ALMAQDIR — VƏ HANSISA GÜNÜ INPUT-LARIN ÜMUMİ GÖRÜNÜŞÜNÜ (MƏS. `border-radius`) DƏYİŞMƏK LAZIM GƏLSƏ, TƏK BİR YERİ (`FormInput.module.css`) DƏYİŞMƏK KİFAYƏT EDƏCƏK, ÜÇ AYRI FORMANI GƏZMƏYƏ EHTİYAC QALMAYACAQ.

### `ActionMenu.tsx` (ən MÜRƏKKƏB SHARED KOMPONENT)

**HARADA İSTİFADƏ OLUNUR, HARADA YOX?** `ActionMenu` YALNIZ Campaigns/Categories/Products-DA İSTİFADƏ OLUNUR — Orders VƏ Users İSƏ BİLƏRƏKDƏN, ONUN ƏVƏZİNƏ SADƏ, BİRBAŞA "Göstər" DÜYMƏSİ + DETAL MODALI İŞLƏDİR (Hissə 18-ə baxın). BU, "UNUDULMUŞ" BİR TUTARSIZLIQ DEYİL, QƏSDƏN QƏBUL EDİLMİŞ MƏHSUL QƏRARIDIR (Orders/Users-də düzəltmə/silmə YOXDUR, ONA GÖRƏ 3-DÜYMƏLİ MENYUYA EHTİYAC DA YOXDUR) — GƏLƏCƏKDƏ BEŞ SƏHİFƏNİ "EYNİLƏŞDİRMƏK" NİYYƏTİ İLƏ BUNA TOXUNMAYIN.

```tsx
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { MoreVertical, Eye, Pencil, Trash2 } from 'lucide-react'
import styles from './ActionMenu.module.css'

interface ActionMenuProps {
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

export default function ActionMenu({ onView, onEdit, onDelete }: ActionMenuProps) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const openMenu = () => {
    const rect = triggerRef.current!.getBoundingClientRect()
    const menuWidth = 150
    setPos({
      top: rect.bottom + 4,
      left: Math.max(8, rect.right - menuWidth),
    })
    setOpen(true)
  }

  useEffect(() => {
    if (!open) return undefined

    const handlePointerDown = (e: MouseEvent) => {
      const target = e.target as Node
      if (triggerRef.current?.contains(target) || menuRef.current?.contains(target)) return
      setOpen(false)
    }
    const handleScroll = () => setOpen(false)

    document.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('scroll', handleScroll, true)
    window.addEventListener('resize', handleScroll)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('scroll', handleScroll, true)
      window.removeEventListener('resize', handleScroll)
    }
  }, [open])

  const handleSelect = (fn?: () => void) => {
    setOpen(false)
    fn?.()
  }

  return (
    <>
      <button type="button" ref={triggerRef} onClick={() => (open ? setOpen(false) : openMenu())} aria-label="Əməliyyatlar">
        <MoreVertical size={18} />
      </button>
      {open &&
        createPortal(
          <div ref={menuRef} className={styles.menu} style={{ top: pos.top, left: pos.left }}>
            <button onClick={() => handleSelect(onView)}><Eye size={14} /> Bax</button>
            <button onClick={() => handleSelect(onEdit)}><Pencil size={14} /> Düzəlt</button>
            <button onClick={() => handleSelect(onDelete)}><Trash2 size={14} /> Sil</button>
          </div>,
          document.body,
        )}
    </>
  )
}
```

Bu, CƏDVƏLLƏRDƏKİ "ÜÇ NÖQTƏ" (⋮) MENYUSUDUR (Bax/Düzəlt/Sil).

- `onView?: () => void` (VƏ EYNİLƏ `onEdit`, `onDelete`) — ÜÇÜ DƏ OPSİONALDIR (`?`), ÇÜNKİ, MƏSƏLƏN, BƏZİ SƏHİFƏLƏR `ActionMenu`-NU YALNIZ BƏZİ ƏMƏLİYYATLARLA İSTİFADƏ EDƏ BİLƏR (PRAKTİKADA HAMISI VERİLİR, AMMA TİP SƏVİYYƏSİNDƏ MƏCBURİ DEYİL).
- `triggerRef = useRef<HTMLButtonElement>(null)` / `menuRef = useRef<HTMLDivElement>(null)` — İKİ AYRI `useRef`, İKİSİ DƏ FƏRQLİ DOM ELEMENT TİPLƏRİNƏ İŞARƏ EDİR (`HTMLButtonElement` VƏ `HTMLDivElement`) — BİRİ "⋮" DÜYMƏSİNƏ, DİGƏRİ AÇILAN MENYUNUN ÖZÜNƏ.
- `triggerRef.current!.getBoundingClientRect()` — **`!` (NON-NULL ASSERTION)** BURADA VAR: `openMenu()` FUNKSİYASI YALNIZ DÜYMƏ ARTIQ EKRANDA OLANDA (İSTİFADƏÇİ ONA KLİK EDƏNDƏ) ÇAĞIRILIR, ONA GÖRƏ `triggerRef.current`-İN O ANDA `null` OLA BİLMƏYƏCƏYİNƏ ƏMİNİK — BUNU `!` İLƏ TypeScript-Ə BİLDİRİRİK (Hissə 6-DAKI `document.getElementById('root')!` İLƏ EYNİ MƏNTİQ).
- `handlePointerDown = (e: MouseEvent) => { const target = e.target as Node; ... }` — `e.target`-İN ÖZÜ, BRAUZERİN TİPLƏRİNƏ GÖRƏ, ÇOX GENİŞ BİR TİPDƏDİR (`EventTarget`) — `.contains(...)` METODU İSƏ MƏHZ `Node` TİPİ GÖZLƏYİR, ONA GÖRƏ `as Node` İLƏ DAR BİR TİPƏ "ÇEVİRİRİK" (BU DA TƏHLÜKƏSİZ BİR `as`-DIR, ÇÜNKİ BRAUZERDƏ HƏR HADİSƏ HƏDƏFİ (`target`) HƏMİŞƏ DƏ BİR `Node`-DUR).
- `handleSelect = (fn?: () => void) => {...}` — PARAMETR `fn?: () => void` — OPSİONAL BİR FUNKSİYA (ÇÜNKİ `onView`/`onEdit`/`onDelete` DA OPSİONALDIR).
- **`createPortal(...)` NƏ ÜÇÜNDÜR?** NORMAL HALDA, JSX ELEMENTLƏRİ ÖZ "VALIDEYN" ELEMENTİNİN İÇİNDƏ RENDER OLUNUR. AMMA BU MENYU BİR CƏDVƏL XANASININ (`<td>`) İÇİNDƏDİR, CƏDVƏL İSƏ SCROLL OLAN BİR QUTUYA BÜRÜNÜB — ƏGƏR MENYU O QUTUNUN İÇİNDƏ QALSAYDI, "KƏSİLƏRDİ" (GÖRÜNMƏZ OLARDI). `createPortal(jsxElementi, document.body)` — BU JSX-İ, REACT AĞACINDA HARADA OLMASINDAN ASILI OLMAYARAQ, DOM-DA BİRBAŞA `<body>`-NİN İÇİNƏ "IŞIN" EDİR.
- `<>...</>` — **FRAGMENT**DİR. REACT-DƏ BİR KOMPONENT YALNIZ BİR "KÖK" ELEMENT QAYTARA BİLƏR — AMMA BURADA HƏM DÜYMƏ, HƏM DƏ (ŞƏRTİ) MENYU EYNİ SƏVİYYƏDƏ OLMALIDIR, ONA GÖRƏ "GÖRÜNMƏZ" BİR SARĞI KİMİ `<>...</>` (FRAGMENT) İŞLƏDİLİR.

### `Table.tsx`

```tsx
import type { TableProps, TableEmptyRowProps } from '@/types/shared'
import styles from './Table.module.css'

export function Table({ columns, minWidth = 720, children }: TableProps) {
  return (
    <div className={styles.scroll}>
      <table className={styles.table} style={{ minWidth }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={{ width: col.width, textAlign: col.align }}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

export function TableEmptyRow({ colSpan, children = 'Nəticə tapılmadı' }: TableEmptyRowProps) {
  return (
    <tr className={styles.emptyRow}>
      <td colSpan={colSpan}>{children}</td>
    </tr>
  )
}

export default Table
```
BU FAYL **İKİ NAMED EXPORT** (`Table`, `TableEmptyRow`) VƏ BİR **DEFAULT EXPORT** (`Table`-IN ÖZÜ) VERİR. **`interface TableProps`/`TableEmptyRowProps` ARTIQ BU FAYLDA DEYİL** — Hissə 5-dəki `types/shared/`-ə keçidlə eyni səbəbdən, ikisi də `types/shared/`-dədir. `columns: Column[]` — Hissə 5-DƏ TƏYİN OLUNAN `Column` TİPİ, HƏR SƏHİFƏNİN ÖZ `columns` MASSİVİ MƏHZ BU FORMAYA UYĞUN OLMALIDIR (`{key: string; label: ReactNode; width?: number | string; align?: 'left' | 'center' | 'right'}`). **`style={{ width: col.width, textAlign: col.align }}`-DƏKİ `textAlign: col.align`** — SONRADAN ƏLAVƏ OLUNUB (Hissə 5-Ə BAXIN, `Column.align`) — `col.align` VERİLMƏYİBSƏ, `undefined` OLUR VƏ `textAlign` STİLİ SADƏCƏ TƏTBİQ OLUNMUR (BRAUZERİN ÖZ DEFAULT-U — YƏNİ CSS-DƏKİ `text-align: center` (Table.module.css-in ÖZ DEFAULT-U) QALIR) — YALNIZ Orders SƏHİFƏSİ (Hissə 18-ə baxın) BƏZİ SÜTUNLARI FƏRQLİ HİZALAMAQ ÜÇÜN BUNU İSTİFADƏ EDİR. **`Table` KOMPONENTİ, NİYƏ GENERİK (`Table<T>`) DEYİL?** Hissə 5-DƏ QEYD OLUNDU: `columns[].key`-DƏN HEÇ VAXT SƏTIR DATASINA "İNDEKSLƏMƏK" ÜÇÜN İSTİFADƏ OLUNMUR (HƏR SƏHİFƏ ÖZ `<tr>`-LƏRİNİ ƏLLƏ YAZIR), YALNIZ REACT `key` + GÖRÜNTÜ ETİKETİ ÜÇÜNDÜR — ONA GÖRƏ GENERİK ETMƏK ARTIQ (LAZIMSIZ) MÜRƏKKƏBLİK OLARDI, HEÇ BİR HƏQİQİ SƏHVİ TUTMAZDI.

`Table` KOMPONENTİ ÖZÜ DATA "BİLMİR" — SƏHİFƏLƏR ONA `columns` (SÜTUN TƏSVİRLƏRİ) VƏ `children` (CƏDVƏLİN SƏTİRLƏRİ, YƏNİ `<tr>...</tr>` ELEMENTLƏRİ) VERİR, O SADƏCƏ `<thead>`-İ `columns`-DAN AVTOMATİK QURUR, `<tbody>`-NİN İÇİNƏ İSƏ `children`-İ QOYUR.

`TableEmptyRow` — SİYAHI BOŞ OLANDA ("Nəticə tapılmadı") GÖSTƏRİLƏN XÜSUSİ SƏTİR. `colSpan: number` — MÜTLƏQDİR (BOŞ SƏTRİN NEÇƏ SÜTUNU "TUTACAĞINI" BİLDİRİR), `children = 'Nəticə tapılmadı'` — DEFAULT MƏTN, İSTƏSƏNİZ FƏRQLİ MƏTN VERƏ BİLƏRSİNİZ.

**Cədvəlin SCROLL DAVRANIŞI haqqında qısa qeyd:** `.scroll` (`Table.module.css`-də) `flex: 1` OLARAQ TƏYİN OLUNUB — BU SƏBƏBDƏN, SƏHİFƏNİN BÜTÖV HÜNDÜRLÜYÜ SABİT QALIR, ARTIQ SƏTİR OLANDA CƏDVƏL ÖZÜ (SƏHİFƏ YOX) İÇƏRİDƏ SÜRÜŞDÜRÜLÜR (Hissə 17-DƏ, CSS BÖLMƏSİNDƏ, ƏTRAFLI İZAH OLUNUR — BU, TAMAMİLƏ CSS MƏSƏLƏSİDİR, TypeScript-Ə AİD DEYİL).

### `Loading.tsx`

**BU KOMPONENT, LAYİHƏDƏ ƏN ÇOX "DİZAYN İTERASİYASINDAN" KEÇƏN HİSSƏDİR** — ƏVVƏLCƏ SADƏ BİR FIRLANAN DAİRƏ İDİ, SONRA BİR NEÇƏ FƏRQLİ VİZUAL KONSEPT (RƏNGLİ HALQA+GLOW EFFEKTİ, 4-NÖQTƏLİ "SIÇRAYIŞ", ORBİT EDƏN "PEYKLƏR") SINANDI, VƏ SON OLARAQ **5-ÇUBUQLU "EKVALAYZER"** DİZAYNINDA QƏRARLAŞDI:

```tsx
import styles from './Loading.module.css'

interface LoadingProps {
  fullScreen?: boolean
}

export default function Loading({ fullScreen = false }: LoadingProps) {
  return (
    <div className={`flex flex-col items-center justify-center gap-5 ${styles.wrap} ${fullScreen ? styles.fullScreen : ''}`}>
      <span className={`flex items-end ${styles.bars}`}>
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
      </span>
      <span className={styles.text}>Yüklənir...</span>
    </div>
  )
}
```
TypeScript BAXIMINDAN BU FAYL SADƏDİR (`fullScreen?: boolean`, TƏK BİR OPSİONAL PROP) — ƏSAS MARAQLI HİSSƏ CSS-DƏDİR (`Loading.module.css`):

```css
.fullScreen {
  position: fixed;
  inset: 0;
  margin-bottom: 0;
  background: var(--color-page-bg);
  z-index: 50;
}

.fullScreen .bars { gap: 30px; }
.fullScreen .dot  { height: 44px; width: 44px; --bounce: -52px; }

.bars { display: flex; align-items: flex-end; gap: 20px; }

.bar {
  width: 20px;
  border-radius: 6px;
  height: 32px;
  animation: eq 1s ease-in-out infinite;
}

.bar:nth-child(1) { background: var(--color-green);       animation-delay: 0s; }
.bar:nth-child(2) { background: var(--color-blue-text);   animation-delay: 0.1s; }
.bar:nth-child(3) { background: var(--color-purple-text); animation-delay: 0.2s; }
.bar:nth-child(4) { background: var(--color-amber-text);  animation-delay: 0.3s; }
.bar:nth-child(5) { background: var(--color-green);       animation-delay: 0.4s; }

@keyframes eq {
  0%, 100% { height: var(--bar-min); }
  50%      { height: var(--bar-max); }
}
```
(Yuxarıdakı CSS bir az sadələşdirilib göstərilir — həqiqi fayl `--bar-width`/`--bar-gap`/`--bar-min`/`--bar-max` adlı CSS DƏYİŞƏNLƏRİNDƏN istifadə edir, aşağıda izah olunur.)

- **BEŞ `.bar` SPAN-I** — HƏR BİRİ FƏRQLİ BADGE RƏNGİNDƏ (YAŞIL/MAVİ/BƏNÖVŞƏYİ/KƏHRƏBA/YAŞIL), EYNİ `eq` HÜNDÜRLÜK ANİMASİYASINI, AMMA HƏR BİRİ FƏRQLİ `animation-delay` (0/0.1/0.2/0.3/0.4 SANİYƏ) İLƏ İCRA EDİR — NƏTİCƏDƏ HÜNDÜRLÜKLƏR EYNİ ANDA YOX, "DALĞA" KİMİ ARDICIL DƏYİŞİR.
- **CSS DƏYİŞƏNLƏRİ (`--bar-width`, `--bar-gap`, `--bar-min`, `--bar-max`) VASİTƏSİLƏ ÖLÇÜLƏNDİRMƏ** — HƏQİQİ FAYLDA, ÇUBUQLARIN ENİ/ARALIĞI/MİN-HÜNDÜRLÜYÜ/MAKS-HÜNDÜRLÜYÜ SABİT ƏDƏDLƏR YOX, CSS "CUSTOM PROPERTY" (`--ad: dəyər`) KİMİ YAZILIB, VƏ `@keyframes eq` DƏ (`height: var(--bar-min)` / `var(--bar-max)`) BU DƏYİŞƏNLƏRDƏN OXUYUR. BUNUN FAYDASI: `.fullScreen .bars { --bar-width: 28px; --bar-gap: 24px; --bar-min: 48px; --bar-max: 192px; }` KİMİ, TƏK BİR YERDƏ BÜTÜN ÖLÇÜLƏRİ İKİQAT BÖYÜDÜB, EYNİ `@keyframes` TƏRİFİNİ TƏKRAR YAZMADAN, "TAM EKRAN" REJİMİNİ DAHA BÖYÜK GÖSTƏRMƏK MÜMKÜN OLUR (BU, CSS-İN ÖZ MEXANİZMİDİR — CUSTOM PROPERTY-LƏR "MİRAS ALINIR", UŞAQ ELEMENTLƏR VALİDEYNDƏ TƏYİN OLUNAN DƏYƏRİ AVTOMATİK GÖRÜR).
- **`.fullScreen { position: fixed; inset: 0; ... }`** — Bu, BÖYÜK BİR CSS DÜZƏLİŞİDİR: ƏVVƏLLƏR `.fullScreen` sadəcə `min-height: 70vh` İDİ (SƏHİFƏNİN AXINI İÇİNDƏ UZUN BİR QUTU) — AMMA BU, HƏMİŞƏ EKRANIN DƏQİQ ORTASINDA GÖRÜNMƏYƏ BİLİRDİ (ƏTRAF LAYOUT-DAN ASILI OLARAQ). `position: fixed; inset: 0` İSƏ SPİNNERİ BİRBAŞA BRAUZER PƏNCƏRƏSİNƏ (VIEWPORT-A) "BƏRKİDİR" — ARTIQ HANSI SƏHİFƏDƏ, HANSI SCROLL VƏZİYYƏTİNDƏ OLMASINDAN ASILI OLMAYARAQ, HƏMİŞƏ DƏQIQ EKRANIN ORTASINDADIR, VƏ ARXA FONU DA (`background: var(--color-page-bg)`) ÖRTÜR.
- **NİYƏ BU QƏDƏR ÇOX DİZAYN DƏYİŞDİ?** Bu, "SUBYEKTİV" BİR DİZAYN QƏRARI İDİ (İSTİFADƏÇİ HƏR DƏFƏ "DAHA COOL", "DAHA BÖYÜK" DEYƏ YENİ VARİANT İSTƏDİ) — TypeScript/CSS-İN ÖZÜ BUNU "SƏHV" SAYMIR (`typecheck`/`lint` HƏR VARİANTDA TƏMİZ KEÇİRDİ), ÇÜNKİ BU, FUNKSİONAL DEYİL, TAMAMİLƏ VİZUAL BİR QƏRARDIR. **DƏRS**: CSS-ONLY ANİMASİYALAR KİMİ VİZUAL DƏYİŞİKLİKLƏRİ `npm run typecheck`/`npm run lint` TUTA BİLMİR — BELƏ DƏYİŞİKLİKLƏRİ TƏTBİQ ETMƏZDƏN ƏVVƏL, HƏQİQƏTƏN NECƏ GÖRÜNDÜYÜNƏ (MƏS. BRAUZERDƏ, YA DA BİR SCREENSHOT ALƏTİ İLƏ) BAXMAQ LAZIMDIR.

### `ErrorBoundary.tsx`

```tsx
import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { ServerCrash } from 'lucide-react'
import Button from '@/shared/components/Button'
import styles from './ErrorBoundary.module.css'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  override state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info)
  }

  override render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div className={styles.page}>
        <span className={styles.badge}><ServerCrash size={32} /></span>
        <h1 className={styles.title}>Nəsə səhv getdi</h1>
        <p className={styles.text}>Sorğunu yerinə yetirmək mümkün olmadı. Bir az sonra yenidən cəhd edin.</p>
        <Button onClick={() => (window.location.href = '/sifarisler')}>Ana səhifəyə qayıt</Button>
      </div>
    )
  }
}
```

**BU FAYL, LAYİHƏDƏ YEGANƏ "CLASS KOMPONENT"DİR** — BÜTÜN DİGƏR HƏR ŞEY FUNKSİYA KOMPONENTLƏRİDİR. SƏBƏBİ: REACT-DA "ERROR BOUNDARY" (XƏTA TUTUCUSU) YALNIZ CLASS KOMPONENT KİMİ YAZILA BİLƏR.

- `class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState>` — **`<ErrorBoundaryProps, ErrorBoundaryState>`** — Hissə 3-DƏKİ GENERİK SİNTAKSİS, İKİ TİP PARAMETRİ İLƏ: BİRİNCİSİ (`ErrorBoundaryProps`) — BU KOMPONENTİN QƏBUL ETDİYİ PROP-LAR, İKİNCİSİ (`ErrorBoundaryState`) — BU KOMPONENTİN DAXİLİ "STATE"İ (`useState`-İN CLASS VERSİYASI). React-IN ÖZ `Component` SİNFİ MƏHZ BU İKİ GENERİK PARAMETRİ QƏBUL EDİR.
- `override state: ErrorBoundaryState = { hasError: false }` — `override` (Hissə 3-Ə BAXIN, `noImplicitOverride` AYARI TƏLƏB EDİR, ÇÜNKİ `state` React-IN ÖZ `Component` SİNFİNDƏ ARTIQ MÖVCUDDUR) — BAŞLANĞICDA XƏTA YOXDUR.
- `static getDerivedStateFromError(): ErrorBoundaryState` — REACT-IN ÖZÜ ÇAĞIRDIĞI XÜSUSİ BİR METODDUR (`static` OLDUĞU ÜÇÜN `override` YAZILMIR — STATİK ÜZVLƏR `override` QAYDASINA TABE DEYİL): BU KOMPONENTİN **İSTƏNİLƏN UŞAĞINDA** BİR JAVASCRIPT XƏTASI BAŞ VERƏNDƏ, REACT AVTOMATİK BUNU ÇAĞIRIR, QAYTARILAN OBYEKT YENİ `state` OLUR.
- `override componentDidCatch(error: Error, info: ErrorInfo)` — EYNİ ANDA İŞƏ DÜŞƏN DİGƏR BİR METOD, XƏTANI (VƏ ONUN "STACK" MƏLUMATINI, `info: ErrorInfo` — React-IN ÖZ TİPİ) KONSOLA YAZMAQ ÜÇÜN İSTİFADƏ OLUNUR.
- `override render()` — CLASS KOMPONENTLƏRDƏ JSX QAYTARAN METODDUR.
  - `if (!this.state.hasError) return this.props.children` — XƏTA YOXDURSA, SADƏCƏ NORMAL UŞAQLARI GÖSTƏR.
  - XƏTA VARSA, ONUN ƏVƏZİNƏ BU "FALLBACK" EKRANI GÖSTƏRİR.
  - `onClick={() => (window.location.href = '/sifarisler')}` — DİQQƏT: `useNavigate()` YOX, ÇÜNKİ HOOK-LAR YALNIZ FUNKSİYA KOMPONENTLƏRİNDƏ İŞLƏYİR, CLASS KOMPONENTDƏ YOX.
  - `this.state.hasError` / `this.props.children` — CLASS KOMPONENTLƏRDƏ `state`/`props`-A HƏMİŞƏ `this.` İLƏ MÜRACİƏT OLUNUR.

**Harada istifadə olunur?** `main.tsx`-də `<ErrorBoundary><App/></ErrorBoundary>` — BÜTÜN TƏTBİQİ ƏHATƏ EDİR.

---

## Hissə 15: Custom hooks

Bu 4 hook, `src/shared/hooks/` qovluğundadır (`components/`-DAN AYRI, Hissə 4-Ə BAXIN) — HAMISI **generik**DİR (Hissə 3-Ə BAXIN), ÇÜNKİ HƏR BİRİ, "HANSI DATA İLƏ İŞLƏDİYİNDƏN ASILI OLMAYARAQ", EYNİ ŞƏKİLDƏ İŞLƏMƏLİDİR.

### `useTitle.ts`

```ts
import { useEffect } from 'react'

export function useTitle(title?: string): void {
  useEffect(() => {
    const previousTitle = document.title
    document.title = title ? `${title} · Tik Tak Admin` : 'Tik Tak Admin'

    return () => {
      document.title = previousTitle
    }
  }, [title])
}
```
`useTitle(title?: string): void` — BURADA GENERİK YOXDUR (Hissə 3-DƏ QEYD OLUNDU: `useTitle` YEGANƏ HOOK-DUR Kİ, GENERİK OLMASINA EHTİYAC DUYMUR, ÇÜNKİ HƏMİŞƏ SADƏCƏ `string` İLƏ İŞLƏYİR). `title?: string` — OPSİONALDIR (VERİLMƏSƏ, DEFAULT BAŞLIQ İSTİFADƏ OLUNUR). `document.title` — BRAUZERİN TAB BAŞLIĞIDIR. `previousTitle` — DƏYİŞDİRMƏZDƏN ƏVVƏLKİ BAŞLIĞI YADDA SAXLAYIR. `return () => { document.title = previousTitle }` — CLEANUP FUNKSİYASI: KOMPONENT EKRANDAN GEDƏNDƏ, TAB BAŞLIĞINI KÖHNƏ HALINA QAYTARIR. HƏR SƏHİFƏ ÖZ ADI İLƏ `useTitle('Kateqoriyalar')` ÇAĞIRIR.

### `useDebounce.ts`

```ts
import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debouncedValue
}
```
**"Debounce" NƏ DEMƏKDİR?** İSTİFADƏÇİ AXTARIŞ QUTUSUNA YAZANDA, HƏR HƏRFDƏ SERVERƏ SORĞU GETSƏ, ÇOX LAZIMSIZ SORĞU OLARDI. DEBOUNCE — "İSTİFADƏÇİ YAZMAĞI DAYANDIRDIQDAN MÜƏYYƏN MÜDDƏT (500ms) SONRA DAVRAN" DEMƏKDİR.

`useDebounce<T>(value: T, delay = 500): T` — **`<T>` GENERİK, ÇÜNKİ BU HOOK, PRİNSİPCƏ, İSTƏNİLƏN TİPDƏ BİR DƏYƏRİ "GECİKDİRƏ" BİLƏR** (BU LAYİHƏDƏ HƏMİŞƏ `string` İLƏ ÇAĞIRILIR — AXTARIŞ MƏTNİ ÜÇÜN — AMMA HOOK-UN ÖZÜ BUNA MƏHDUD DEYİL). `T`-NİN NƏ OLDUĞU, ÇAĞIRILAN YERDƏ AVTOMATİK MÜƏYYƏNLƏŞİR: `useDebounce(search, 500)` (`search: string`) ÇAĞIRANDA, `T = string` OLUR, NƏTİCƏDƏ QAYTARILAN DƏYƏR DƏ `string`-DİR.
- `setTimeout(() => setDebouncedValue(value), delay)` — `delay` (500) MİLLİSANİYƏ SONRA, `debouncedValue`-Nİ CARİ `value`-YA BƏRABƏRLƏŞDİRƏCƏK BİR "SAAT" QURUR.
- `return () => clearTimeout(timeout)` — CLEANUP: ƏGƏR `value` 500ms BİTMƏMİŞ YENƏ DƏYİŞSƏ (İSTİFADƏÇİ YENİDƏN YAZIRSA), ƏVVƏLKİ "SAAT" LƏĞV OLUNUR, YENİSİ BAŞLAYIR — BELƏLİKLƏ YALNIZ İSTİFADƏÇİ 500ms ƏRZİNDƏ HEÇ NƏ YAZMASA, `debouncedValue` YENİLƏNİR.
- İSTİFADƏ: `AdminLayout.tsx`-də `useDebounce(search, 500)` — AXTARIŞ MƏTNİ ANINDA STATE-Ə YAZILIR, AMMA SƏHİFƏLƏRƏ ÖTÜRÜLƏN "DEBOUNCED" DƏYƏR YALNIZ 500ms SONRA YENİLƏNİR.

### `usePagination.ts`

```ts
import { useState } from 'react'

export function usePagination<T>(items: T[], initialPageSize = 5) {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSizeState] = useState(initialPageSize)

  const setPageSize = (size: number) => {
    setPageSizeState(size)
    setPage(1)
  }

  const paged = items.slice((page - 1) * pageSize, page * pageSize)

  return { page, setPage, pageSize, setPageSize, paged }
}
```
`usePagination<T>(items: T[], initialPageSize = 5)` — **BU LAYİHƏNİN ƏN AYDIN GENERİK MİSALIDIR** (Hissə 3-Ə BAXIN): `items: T[]` — "İSTƏNİLƏN TİPDƏN MASSİV" (`Category[]`, `Product[]`, `User[]` — HANSI SƏHİFƏDƏ İSTİFADƏ OLUNSA), `T` HƏMİN SƏHİFƏNİN ÖZÜNDƏ AVTOMATİK MÜƏYYƏNLƏŞİR. **DİQQƏT — QAYTARILAN OBYEKTİN ÖZÜNƏ `: {...}` KİMİ AÇIQ TİP YAZILMAYIB** — TypeScript ÖZÜ, FUNKSİYANIN İÇİNDƏKİ HƏR DƏYİŞƏNDƏN (MƏS. `paged: T[]`, ÇÜNKİ `items.slice(...)`-İN NƏTİCƏSİ DƏ `T[]`-DİR) NƏTİCƏ OBYEKTİNİN FORMASINI "İNFER" EDİR (Hissə 3-DƏKİ "TİP İNFERENCE"-Ə BAXIN) — BU, HOOK-LARDA ÇOX TƏBİİ BİR PATTERNDIR, HƏR YERDƏ AÇIQ TİP YAZMAĞA EHTİYAC YOXDUR.
- `items` — TAM (FİLTRLƏNMİŞ) SİYAHI, `initialPageSize` — BAŞLANĞIC SƏHİFƏ ÖLÇÜSÜ (DEFAULT 5).
- `page`/`pageSize` — İKİ AYRI `useState`, CARİ SƏHİFƏ NÖMRƏSİ VƏ SƏHİFƏ BAŞINA NEÇƏ ELEMENT GÖSTƏRİLƏCƏYİ.
- `setPageSize(size: number)` — **ÖZ FUNKSİYAMIZDIR** (`useState`-İN ÖZ SETTER-İ DEYİL, BİZ YAZMIŞIQ) — SƏHİFƏ ÖLÇÜSÜNÜ DƏYİŞDİRİR VƏ EYNİ ZAMANDA `page`-İ 1-Ə QAYTARIR.
- `paged = items.slice((page - 1) * pageSize, page * pageSize)` — TAM SİYAHINI, CARİ SƏHİFƏYƏ UYĞUN HİSSƏYƏ "KƏSİR". `paged`-İN TİPİ, `items: T[]`-DƏN AVTOMATİK OLARAQ `T[]`-DİR — YƏNİ, `Category[]` VERSƏNİZ, `paged` DƏ `Category[]` OLUR (`any[]` YOX).
- SON SƏTİR — OBYEKT QAYTARIR, SƏHİFƏLƏR BUNU `const { page, setPage, pageSize, paged } = usePagination(filtered)` ŞƏKLİNDƏ DESTRUCTURE EDİB İSTİFADƏ EDİR.

### `useCrudModal.ts`

```ts
import { useState } from 'react'

export function useCrudModal<TItem, TForm>(emptyForm: TForm, toForm: (item: TItem) => TForm) {
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<TItem | null>(null)
  const [form, setForm] = useState<TForm>(emptyForm)
  const [deleteTarget, setDeleteTarget] = useState<TItem | null>(null)
  const [viewTarget, setViewTarget] = useState<TItem | null>(null)

  const openCreate = (overrides: Partial<TForm> = {}) => {
    setEditing(null)
    setForm({ ...emptyForm, ...overrides })
    setFormOpen(true)
  }

  const openEdit = (item: TItem) => {
    setEditing(item)
    setForm(toForm(item))
    setFormOpen(true)
  }

  return { formOpen, setFormOpen, editing, form, setForm, deleteTarget, setDeleteTarget, viewTarget, setViewTarget, openCreate, openEdit }
}
```
BU HOOK, KATEQORİYALAR/KAMPANİYALAR/MƏHSULLAR SƏHİFƏLƏRİNİN **ÜÇÜNDƏ DƏ EYNİ OLAN** "YARAT/DÜZƏLT/SİL/BAX" MODAL MƏNTİQİNİ BİR YERƏ YIĞIR.

**`<TItem, TForm>` — NİYƏ İKİ AYRI GENERİK (BİR YOX)?** Çünki `TItem` (SİYAHI ELEMENTİ, MƏS. `Product`) VƏ `TForm` (FORMANIN ÖZÜ, MƏS. `ProductForm`) **FƏRQLİ FORMALARDIR** (Hissə 5-DƏ, `ProductForm.category_id`-İN `Product.category_id`-DƏN NİYƏ FƏRQLİ OLDUĞUNU GÖRDÜK) — TƏK BİR GENERİK (`<T>`) KİFAYƏT ETMƏZDİ, ÇÜNKİ O ZAMAN `editing: T` İLƏ `form: T` EYNİ TİPDƏ OLARDI, HALBUKI ONLAR HƏQİQƏTƏN FƏRQLİDİR.
- `emptyForm: TForm` — BAŞLANĞIC (BOŞ) FORMA DƏYƏRLƏRİ, `TForm` TİPİNDƏ.
- `toForm: (item: TItem) => TForm` — Hissə 3-DƏKİ "FUNKSİYA TİPİ": "BİR `TItem` ALIB, BİR `TForm` QAYTARAN FUNKSİYA" — SƏHİFƏNİN ÖZÜNÜN VERDİYİ ÇEVİRMƏ FUNKSİYASI (MƏS. `Categories.tsx`-DƏKİ `toForm`).
- 5 `useState` — `formOpen` (FORMA MODALI AÇIQDIRMI, `boolean`), `editing: TItem | null` (HANSI ELEMENT DÜZƏLDİLİR — `null`-DURSA "YENİ YARATMA" REJİMİDİR), `form: TForm` (FORMANIN CARİ DƏYƏRLƏRİ), `deleteTarget: TItem | null` (SİLİNMƏK İSTƏNƏN ELEMENT), `viewTarget: TItem | null` (BAXILAN ELEMENT).
- `openCreate(overrides: Partial<TForm> = {})` — Hissə 3-DƏKİ `Partial<X>`-Ə BAXIN: "`overrides`, `TForm`-UN İSTƏNİLƏN (BƏLKƏ DƏ HEÇ BİR) SAHƏSİNİ QISMƏN VERƏ BİLƏR" DEMƏKDİR — YENİ ELEMENT YARATMAQ ÜÇÜN FORMANI AÇIR: `editing`-İ `null` EDİR, `form`-U `emptyForm`-A (BAŞLANĞIC BOŞ DƏYƏRLƏR) QAYTARIR — AMMA `{ ...emptyForm, ...overrides }` İLƏ, ÇAĞIRAN TƏRƏF ƏLAVƏ SPESİFİK DƏYƏRLƏR (`overrides`) VERƏ BİLƏR (MƏSƏLƏN, PRODUCTS SƏHİFƏSİ `openCreate({ category_id: '...' })` ÇAĞIRIR Kİ, DEFAULT KATEQORİYA SEÇİLİ GƏLSİN — `Partial<ProductForm>` TİPİ SAYƏSİNDƏ, `{ category_id: '...' }` KİMİ "QISMƏN" BİR OBYEKT VERMƏK İCAZƏLİDİR, BÜTÜN SAHƏLƏRİ TƏKRAR YAZMAĞA EHTİYAC YOXDUR).
- `openEdit(item: TItem)` — MÖVCUD bir elementi düzəltmək üçün: `editing`-İ O ELEMENTƏ QOYUR, `form`-U İSƏ `toForm(item)` İLƏ DOLDURUR.

---

## Hissə 16: `Pagination.tsx`

`src/utils/Pagination/Pagination.tsx` — **KOMPONENTDİR** (YUXARIDAKI `usePagination` HOOK-U İLƏ QARIŞDIRMAYIN, İKİSİ FƏRQLİ ŞEYDİR).

```tsx
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import type { PaginationProps } from '@/types/shared'
import styles from './Pagination.module.css'

const PAGE_SIZE_OPTIONS = [5, 10, 20]

export default function Pagination({ page, pageSize, total, onPageChange, onPageSizeChange }: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1
  const end = Math.min(total, page * pageSize)

  const pageNumbers: (number | '...')[] = []
  for (let p = 1; p <= totalPages; p += 1) {
    if (p === 1 || p === totalPages || Math.abs(p - page) <= 1) {
      pageNumbers.push(p)
    } else if (pageNumbers[pageNumbers.length - 1] !== '...') {
      pageNumbers.push('...')
    }
  }

  return (
    <div className={styles.wrap}>
      <span>{start}-{end} / {total} nəticə</span>
      <div className={styles.pages}>
        <button disabled={page <= 1} onClick={() => onPageChange(page - 1)}><ChevronLeft size={16} /></button>
        {pageNumbers.map((p, idx) =>
          p === '...' ? <span key={`dots-${idx}`}>…</span> : (
            <button key={p} onClick={() => onPageChange(p)} className={p === page ? styles.pageBtnActive : ''}>{p}</button>
          ),
        )}
        <button disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}><ChevronRight size={16} /></button>
      </div>
      {onPageSizeChange && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button type="button" className={styles.pageSize}>
              {pageSize} - page
              <ChevronDown size={14} />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content align="end" sideOffset={4} className={styles.pageSizeMenu}>
              {PAGE_SIZE_OPTIONS.map((size) => (
                <DropdownMenu.Item
                  key={size}
                  onSelect={() => onPageSizeChange(size)}
                  className={`${styles.pageSizeItem} ${size === pageSize ? styles.pageSizeItemActive : ''}`}
                >
                  {size} - page
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      )}
    </div>
  )
}
```

- **`interface PaginationProps` ARTIQ BU FAYLDA YOX** — Hissə 5-dəki `types/shared/`-ə keçidlə eyni səbəbdən, `types/shared/PaginationProps.ts`-dədir.
- `onPageChange: (page: number) => void` VƏ `onPageSizeChange?: (size: number) => void` — BİRİ MÜTLƏQ (`onPageChange`), DİGƏRİ OPSİONAL (`onPageSizeChange` — YALNIZ ORDERS SƏHİFƏSİ VERİR, Hissə 18-Ə BAXIN).
- **SƏHİFƏ-ÖLÇÜSÜ SEÇİCİSİ ARTIQ `<select>` DEYİL, RADIX `DropdownMenu`-DUR** — BU, Orders-in sütun filtrlərində GÖRDÜYÜMÜZ (Hissə 18) EYNİ @radix-ui/react-dropdown-menu-A KEÇİDDİR, EYNİ SƏBƏBLƏ: NATİV `<select>` VİZUAL OLARAQ BRAUZERDƏN-BRAUZERƏ FƏRQLİ GÖRÜNÜR VƏ STİLLƏNMƏSİ MƏHDUDDUR (MƏS. AÇILAN SİYAHININ ÖZÜNÜN GÖRÜNÜŞÜNÜ CSS İLƏ DƏYİŞMƏK ÇOX ÇƏTİNDİR) — RADIX-İN "STİLSİZ" (unstyled) PRİMİTİVLƏRİ İSƏ TAM VİZUAL NƏZARƏT VERİR, ELÇATANLIQ (klaviatura, fokus) İSƏ HAZIR GƏLİR. `PAGE_SIZE_OPTIONS = [5, 10, 20]` MASSİVİ ÜZƏRİNDƏ `.map(...)` EDİLƏRƏK `DropdownMenu.Item`-LƏR QURULUR — DƏYƏRLƏRİN ÖZÜ DƏYİŞMƏYİB, YALNIZ NECƏ GÖSTƏRİLDİYİ.
- **`DropdownMenu.Trigger asChild`** — Radix-in ÖZ PATTERNIDIR: "BU DROPDOWN-U AÇAN DÜYMƏNİ ÖZÜM (`<button>`) VERİRƏM, SƏN ONU ƏLAVƏ BİR `<button>` İLƏ SARMA (bu, İKİ İÇ-İÇƏ `<button>` YARADARDI)" DEMƏKDİR — `asChild`, Radix-ə ÖZ TRIGGER DAVRANIŞINI (klik, klaviatura) BİRBAŞA VERİLƏN UŞAQ ELEMENTƏ "TƏTBİQ ET" DEYİR.
- **`onSelect={() => onPageSizeChange(size)}`** — Radix-in ÖZ HADİSƏSİDİR (adi `onClick` YOX) — `onSelect`, HƏM SİÇAN KLİKİNİ, HƏM DƏ KLAVİATURA İLƏ (OX DÜYMƏLƏRİ + Enter) SEÇİMİ EYNİ ANDA TUTUR.
- `const pageNumbers: (number | '...')[] = []` — Hissə 3-DƏKİ UNION-A BAXIN: BU MASSİVİN HƏR ELEMENTİ YA BİR RƏQƏM (SƏHİFƏ NÖMRƏSİ), YA DA DƏQİQ `'...'` MƏTNİDİR (BAŞQA HEÇ NƏ) — TypeScript BUNU AYRICA YAZMASAQ, `[]`-DƏN "İSTƏNİLƏN MASSİV" (GENİŞ, FAYDASIZ BİR TİP) DEYƏ İNFER EDƏRDİ, ONA GÖRƏ BURADA AÇIQ TİP LAZIM GƏLİB.
- `totalPages = Math.max(1, Math.ceil(total / pageSize))` — `Math.ceil` YUXARIYA YUVARLAQLAŞDIRIR. `Math.max(1, ...)` — HƏTTA `total=0` OLSA BELƏ, ƏN AZI 1 SƏHİFƏ GÖSTƏRİR.
- `start`/`end` — "1-5 / 23 nəticə" KİMİ MƏTNİN RƏQƏMLƏRİNİ HESABLAYIR.
- `for (let p = 1; p <= totalPages; p += 1)` — KLASSİK "FOR DÖVRÜ".
- `if (p === 1 || p === totalPages || Math.abs(p - page) <= 1)` — HANSI SƏHİFƏ NÖMRƏLƏRİ GÖRSƏNSİN QƏRARI: BİRİNCİ SƏHİFƏ, SON SƏHİFƏ, VƏ CARİ SƏHİFƏNİN ±1 ƏTRAFINDAKILAR.
- `else if (pageNumbers[pageNumbers.length - 1] !== '...')` — ARTIQ SONUNCU ƏLAVƏ EDİLƏN "..." DEYİLSƏ, BİR "..." ƏLAVƏ ET.

**`Pagination.tsx` (komponent) VS `usePagination.ts` (hook) — FƏRQ NƏDİR?**
- `usePagination` — **MƏNTİQ**DİR. `useState` İLƏ `page`/`pageSize`-İ SAXLAYIR, MASSİVİ `.slice()` EDİR. HEÇ BİR JSX/GÖRÜNÜŞ YOXDUR.
- `Pagination` — **GÖRÜNÜŞ**DÜR. DÜYMƏLƏR, SƏHİFƏ NÖMRƏLƏRİ, "5/page" SEÇİCİSİ. ÖZ STATE-İ YOXDUR, HƏR ŞEYİ PROP KİMİ ALIR.

BİR SƏHİFƏ İKİSİNİ **BİRLİKDƏ** İŞLƏDİR: `usePagination` DATA KƏSİR, `Pagination` KOMPONENTİ İSƏ ONUN NƏTİCƏSİNİ (`page`, `pageSize`, `total`) GÖSTƏRİR VƏ KLİKLƏRİ (`onPageChange`) GERİ HOOK-A ÖTÜRÜR.

### HƏR SƏHİFƏNİN ÖZ `XPagination.tsx` "sarğısı" — NİYƏ SHARED `Pagination`-I BİRBAŞA ÇAĞIRMIRLAR?

Səhifə-daxili refactor-dan sonra (Hissə 4-ə baxın), heç bir səhifə İNDİ `import Pagination from '@/utils/Pagination'`-ı BİRBAŞA ÇAĞIRMIR — bunun ƏVƏZİNƏ, HƏR SƏHİFƏNİN ÖZ `pagination/XPagination.tsx` FAYLI VAR, VƏ O, SADƏCƏ SHARED `Pagination`-I ÇAĞIRIR:
```tsx
// pages/Protected/Categories/pagination/CategoriesPagination.tsx
import Pagination from '@/utils/Pagination'
import type { CategoriesPaginationProps } from '@/types/category'

export default function CategoriesPagination({ page, pageSize, total, onPageChange }: CategoriesPaginationProps) {
  return <Pagination page={page} pageSize={pageSize} total={total} onPageChange={onPageChange} />
}
```
**BU, SADƏCƏ BİR "PASS-THROUGH" (HEÇ NƏ ƏLAVƏ ETMƏYƏN) SARĞIDIRSA, NİYƏ LAZIMDIR?** İki səbəb: (1) **`index.tsx`-in idxal siyahısını EYNİ ÜSLUBDA saxlamaq** — `Categories/index.tsx` artıq `CategoriesTable`, `CategoryForm`, `CategoryDetails` KİMİ, HAMISI ÖZ QOVLUĞUNDAN GƏLƏN KOMPONENTLƏR İDXAL EDİR; `Pagination`-I TƏK BAŞINA `@/utils/Pagination`-DAN İDXAL ETMƏK, BU NÜMUNƏDƏN "ÇIXAN" TƏK İSTİSNA OLARDI. (2) **GƏLƏCƏK DƏYİŞİKLİYƏ HAZIR OLMAQ** — Orders səhifəsi ARTIQ FƏRQLİDİR (`onPageSizeChange` PROP-UNU DA ÖTÜRÜR, Hissə 18-ə baxın); əgər GƏLƏCƏKDƏ, MƏSƏLƏN, YALNIZ Categories SƏHİFƏSİNDƏ SƏHİFƏLƏMƏYƏ XÜSUSİ BİR DAVRANIŞ (MƏS. URL-Ə `?page=` ƏLAVƏ ETMƏK) LAZIM GƏLSƏ, DƏYİŞİKLİK YALNIZ `CategoriesPagination.tsx`-DƏ EDİLƏR, SHARED `Pagination`-A TOXUNULMAZ (VƏ DİGƏR SƏHİFƏLƏRƏ TƏSİR ETMƏZ).

**"BÖLMƏSƏYDİK NECƏ OLARDI?"** Hər `index.tsx`-in ÖZÜNDƏ birbaşa `<Pagination page={page} .../>` YAZMAQ DA TAM İŞLƏYƏRDİ (VƏ CƏMİ BİR SƏTİR QISALARDI) — bu, HAZIRDA BİR "GƏLƏCƏYƏ SIĞORTA" QƏRARIDIR, KONKRET BİR BUQ/PROBLEMİN HƏLLİ DEYİL (DİGƏR ÇIXARILAN QOVLUQLARDAN FƏRQLİ OLARAQ). Əgər layihə heç vaxt səhifə-spesifik pagination davranışına ehtiyac duymasa, bu sarğı sadəcə "konvensiya xatirinə" bir əlavə təbəqə olaraq qalacaq — bu, MƏQBUL bir mübadilədir, çünki qazandırdığı "hər yerdə eyni idxal nümunəsi" servisi, ƏLAVƏ ETDİYİ 1 fayl/6 sətir xərcindən DAHA DƏYƏRLİDİR.

---

## Hissə 17: Layout

### `src/layouts/AdminLayout.tsx`

```tsx
import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { useDebounce } from '@/shared/hooks/useDebounce'
import type { LayoutOutletContext } from '@/types/common'
import styles from './AdminLayout.module.css'

export default function AdminLayout() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)
  const { pathname } = useLocation()

  useEffect(() => {
    setSearch('')
  }, [pathname])

  return (
    <div className={styles.page}>
      <div className={styles.headerBar}>
        <div className={styles.headerInner}>
          <Header search={search} onSearchChange={setSearch} />
        </div>
      </div>
      <div className={styles.bodyBar}>
        <div className={styles.bodyInner}>
          <Sidebar />
          <main className={styles.main}>
            <Outlet context={{ search: debouncedSearch } satisfies LayoutOutletContext} />
          </main>
        </div>
      </div>
    </div>
  )
}
```
BU, 5 QORUNAN SƏHİFƏNİN "ÇƏRÇİVƏSİDİR" — SIDEBAR + HEADER + AXTARIŞ MƏNTİQİ.

- `search` — İNPUT-DAKI XAM (ANINDA YENİLƏNƏN) MƏTN. `useDebounce(search, 500)` — Hissə 15-DƏ İZAH OLUNAN GENERİK HOOK, BURADA `T = string` OLARAQ İŞLƏYİR.
- `<Header search={search} onSearchChange={setSearch} />` — HEADER-Ə XAM MƏTNİ VƏ ONU DƏYİŞMƏK FUNKSİYASINI ÖTÜRÜR.
- **`<Outlet context={{ search: debouncedSearch } satisfies LayoutOutletContext} />`** — Hissə 3-DƏ İZAH OLUNAN `satisfies` OPERATORU MƏHZ BURADA İŞLƏDİLİR: `{search: debouncedSearch}` OBYEKTİNİN, `LayoutOutletContext` (Hissə 5-Ə BAXIN, `{search: string}`) TİPİNƏ **DƏQİQ UYĞUN OLDUĞUNU** TƏSDİQLƏYİR. `context` — react-router-dom-un XÜSUSİ BİR MEXANİZMİDİR: `AdminLayout`-UN İÇİNDƏ RENDER OLUNAN İSTƏNİLƏN SƏHİFƏ `useOutletContext<LayoutOutletContext>()` HOOK-U İLƏ BU OBYEKTİ OXUYA BİLİR — BELƏLİKLƏ AXTARIŞ MƏTNİ VALİDEYNDƏN (LAYOUT-DAN) UŞAQLARA (SƏHİFƏLƏRƏ) "PROP DRILLING" (ƏL-ƏL ÖTÜRMƏ) OLMADAN ÇATIR. **DİQQƏT — `useOutletContext<LayoutOutletContext>()`-DƏKİ `<LayoutOutletContext>` VƏ BURADAKI `satisfies LayoutOutletContext` İKİ AYRI YERDƏ, EYNİ TİPƏ İŞARƏ EDİR** — BİRİ "GÖNDƏRƏN" (PRODUCER) TƏRƏFİ, DİGƏRİ "QƏBUL EDƏN" (CONSUMER) TƏRƏFİ TİPLƏYİR, İKİSİ EYNİ TİP OLMASA, TypeScript UYĞUNSUZLUĞU TUTARDI.
- **`useLocation()` + `useEffect(() => setSearch(''), [pathname])`** — BU, BİR REAL BUQ-UN DÜZƏLİŞİDİR: `AdminLayout` SƏHİFƏLƏR ARASI KEÇİDDƏ (MƏS. `/istifadeciler`-DƏN `/sifarisler`-Ə) YENİDƏN MOUNT OLMUR (SADƏCƏ `<Outlet/>`-İN İÇİ DƏYİŞİR), ONA GÖRƏ `search` STATE-İ ÖZÜ-ÖZÜNƏ SIFIRLANMIR. BUNSUZ, MƏSƏLƏN İSTİFADƏÇİLƏR SƏHİFƏSİNDƏ BİR ADI AXTARIB SONRA BAŞQA SƏHİFƏYƏ KEÇSƏNİZ, HƏMİN KÖHNƏ AXTARIŞ MƏTNİ O SƏHİFƏNİN ÖZ FİLTERİNƏ DƏ TƏTBİQ OLUNURDU (ÇÜNKİ EYNİ `debouncedSearch` DƏYƏRİ `LayoutOutletContext` VASİTƏSİLƏ BÜTÜN SƏHİFƏLƏRƏ GEDİR) — NƏTİCƏDƏ HEÇ NƏ UYĞUN GƏLMİR, CƏDVƏL BOŞ GÖRÜNÜRDÜ, VƏ YALNIZ SƏHİFƏNİ YENİLƏMƏK (`search` STATE-İ SIFIRDAN BAŞLADIĞI ÜÇÜN) BUNU "DÜZƏLDİRDİ". `useLocation()`-DAN GƏLƏN `pathname` HƏR ROUTE DƏYİŞƏNDƏ FƏRQLİ OLUR, ONA GÖRƏ `[pathname]` DEPENDENCY-Sİ İLƏ, HƏR SƏHİFƏ KEÇİDİNDƏ `setSearch('')` AVTOMATİK ÇAĞIRILIR.

### `src/components/Sidebar/Sidebar.tsx`

BU FAYL, NAV LİNKLƏRİ + LOGOUT DÜYMƏSİNİ (BİR TƏSDİQ MODALI İLƏ) SAXLAYIR.

```tsx
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { ClipboardList, Megaphone, Tags, Package, Users, LogOut } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import ConfirmModal from '@/shared/components/ConfirmModal'
import styles from './Sidebar.module.css'

const navItems = [
  { to: '/sifarisler', label: 'Sifarişlər', icon: ClipboardList },
  // ... digər 4 nav elementi
]

export default function Sidebar() {
  const navigate = useNavigate()
  const logout = useAuthStore((s) => s.logout)
  const [confirmOpen, setConfirmOpen] = useState(false)

  return (
    <aside className={`flex flex-col ${styles.aside}`}>
      <nav className={`flex flex-col gap-2 ${styles.nav}`}>
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `flex items-center gap-3 ${styles.link} ${isActive ? styles.linkActive : ''}`}
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </nav>
      <button type="button" onClick={() => setConfirmOpen(true)} className={styles.logoutBtn}>
        <LogOut size={18} /> Çıxış
      </button>

      <ConfirmModal
        open={confirmOpen}
        message="Hesabdan çıxmaq istədiyinizə əminsiniz?"
        showIcon={false}
        onConfirm={() => {
          setConfirmOpen(false)
          logout()
          toast.success('Hesabdan çıxış edildi')
          navigate('/login')
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </aside>
  )
}
```
- `{navItems.map(({ to, label, icon: Icon }) => ...)}` — `navItems` MASSİVİNİ GƏZİB, HƏR BİRİ ÜÇÜN BİR `<NavLink>` YARADIR.
- `className={({ isActive }) => ...}` — `NavLink`-İN XÜSUSİ BİR XÜSUSİYYƏTİDİR: `className` PROP-UNA STRİNG ƏVƏZİNƏ BİR FUNKSİYA VERİLƏ BİLƏR, BU FUNKSİYA `{ isActive }` (CARİ URL BU LİNKƏ UYĞUNDURMU, `boolean`) ALIR VƏ UYĞUN KLASI QAYTARIR — react-router-dom-un ÖZ TİPLƏRİ `isActive`-İN `boolean` OLDUĞUNU AVTOMATİK TƏMİN EDİR.
- **LOGOUT AXINI:** `onClick={() => setConfirmOpen(true)}` — DÜYMƏ SADƏCƏ BİR `ConfirmModal`-I AÇIR (Hissə 14-DƏ İZAH OLUNAN, `useState<boolean>` İLƏ İDARƏ OLUNAN KOMPONENT), VƏ ƏSL ÇIXIŞ MƏNTİQİ ONUN `onConfirm` PROP-UNDA BAŞ VERİR: `setConfirmOpen(false)` (MODALI BAĞLA) → `logout()` (ZUSTAND STORE-U TƏMİZLƏ) → **`toast.success('Hesabdan çıxış edildi')`** (Hissə 13-DƏKİ QLOBAL `mutationCache.onError`-DAN FƏRQLİ OLARAQ, `logout` BİR TANSTACK QUERY MUTASİYASI OLMADIĞI ÜÇÜN, ƏL İLƏ ÇAĞIRILMALIDIR) → `navigate('/login')`.

**BİR XÜSUSİYYƏTİN SİLİNMƏSİ HAQQINDA QEYD — "hover prefetch":** Bu faylda ƏVVƏLLƏR bir `PREFETCH: Record<string, (queryClient: QueryClient) => void>` obyekti var idi — siçan bir nav-linkin üzərinə gələndə, o səhifənin datasını (`queryClient.prefetchQuery(...)` ilə) ƏVVƏLCƏDƏN çəkirdi, ki klik olunanda səhifə artıq cache-dən açılsın. Bu, HAZIRKI KODDA ARTIQ YOXDUR — SİDEBAR-DAN ÇIXARILIB. Bunun səbəbi TypeScript-lə əlaqəli DEYİL (bu, TAMAMİLƏ BİR MEHNİQ/PRODUKT QƏRARIDIR, bu sənədin əhatə etdiyi TypeScript miqrasiyasından ASILI OLMAYARAQ dəyişə bilər) — qeyd edilməsinin səbəbi, ƏVVƏLKİ VERSİYADA BU KODU GÖRMÜŞ OLA BİLƏCƏYİNİZDİR: SİDEBAR-IN ARTIQ `services/`/`lib/adapters/`-DAN HEÇ BİR İDXALI YOXDUR, İDXAL SİYAHISI XEYLİ QISALIB.

### `src/components/Header/Header.tsx`

```tsx
import { Moon, Search, Sun } from 'lucide-react'
import { useThemeStore } from '@/store/useThemeStore'
import type { HeaderProps } from '@/types/shared'
import styles from './Header.module.css'

export default function Header({ search, onSearchChange }: HeaderProps) {
  const { theme, toggleTheme } = useThemeStore()
  const isDark = theme === 'dark'

  return (
    <header className={`gap-4 ${styles.header}`}>
      <h1 className={`whitespace-nowrap ${styles.title}`}>TIK TAK ADMIN</h1>
      <div className={styles.searchWrap}>
        <Search size={16} />
        <input value={search} onChange={(e) => onSearchChange?.(e.target.value)} className={styles.searchInput} />
      </div>
      <div className={`flex justify-end ${styles.spacer}`}>
        <button
          type="button"
          onClick={toggleTheme}
          className={`flex cursor-pointer ${styles.themeToggle} ${isDark ? styles.themeToggleDark : ''}`}
          role="switch"
          aria-checked={isDark}
          aria-label={isDark ? 'İşıqlı rejimə keç' : 'Qaranlıq rejimə keç'}
        >
          <Sun size={12} className={styles.trackIconSun} />
          <Moon size={12} className={styles.trackIconMoon} />
          <span className={`flex items-center justify-center ${styles.themeToggleThumb}`}>
            {isDark ? <Moon size={13} /> : <Sun size={13} />}
          </span>
        </button>
      </div>
    </header>
  )
}
```
- `search: string` MÜTLƏQDİR (`AdminLayout`-DAN GƏLİR), `onSearchChange` İSƏ OPSİONALDIR (`?.()` İLƏ ÇAĞIRILIR — Hissə 2-Ə BAXIN). `HeaderProps` İNDİ `types/shared/HeaderProps.ts`-dədir (Hissə 5-ə baxın). ÖZ AXTARIŞ STATE-İ YOXDUR — "CONTROLLED INPUT" NÜMUNƏSİDİR: `value={search}` İLƏ İNPUTUN DƏYƏRİ TAM OLARAQ REACT STATE-İNDƏN İDARƏ OLUNUR, `onChange` HƏR HƏRFDƏ `onSearchChange` (YƏNİ `AdminLayout`-UN `setSearch`-İ) ÇAĞIRIR.
- **YENİ ƏLAVƏ — İŞIQLI/QARANLIQ REJİM DÜYMƏSİ:** `const { theme, toggleTheme } = useThemeStore()` — AŞAĞIDA ÖZ BÖLMƏSİNDƏ İZAH OLUNAN ZUSTAND STORE-U OXUYUR. `role="switch"` + `aria-checked={isDark}` — bu, VİZUAL OLARAQ BİR DÜYMƏ (`<button>`) OLSA DA, ƏLÇATANLIQ (accessibility) BAXIMINDAN BİR "AÇ/BAĞLA ANAHTARI" KİMİ ELAN OLUNUR (EKRAN-OXUYUCULAR BUNU "keçid" kimi tanıyır, sadə düymə kimi yox) — `aria-checked`, `role="switch"`-in TƏLƏB ETDİYİ, CARİ VƏZİYYƏTİ (AÇIQ/BAĞLI) BİLDİRƏN ATRİBUTDUR. `isDark ? <Moon .../> : <Sun .../>` — DÜYMƏNİN İÇİNDƏKİ "TOPUQ" (thumb), CARİ REJİMƏ UYĞUN İKONU (AY/GÜNƏŞ) GÖSTƏRİR, ARXA PLANDAKI İKİ SABİT İKON (`trackIconSun`/`trackIconMoon`) İSƏ HƏMİŞƏ GÖRÜNÜR (FİZİKİ BİR KEÇİD ZOLAĞININ İKİ UCUNDA "İŞIQLI TƏRƏF"/"QARANLIQ TƏRƏF" YAZISI KİMİ).

### `src/store/useThemeStore.ts` — `useAuthStore` ilə EYNİ NÖVDƏN, İKİNCİ Zustand store-u

```ts
import { create } from 'zustand'
import type { Theme, ThemeState } from '@/types/theme'

const STORAGE_KEY = 'admin-theme'

const getInitialTheme = (): Theme => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'dark' : 'light'
}

const applyTheme = (theme: Theme) => {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem(STORAGE_KEY, theme)
}

export const useThemeStore = create<ThemeState>((set, get) => {
  const initial = getInitialTheme()
  applyTheme(initial)

  return {
    theme: initial,
    toggleTheme: () => {
      const next: Theme = get().theme === 'light' ? 'dark' : 'light'
      applyTheme(next)
      set({ theme: next })
    },
  }
})
```
- **`getInitialTheme()`** — İSTİFADƏÇİNİN ÖZ SEÇİMİ (`localStorage`-da SAXLANAN, ƏVVƏLKİ ZİYARƏTDƏN QALAN DƏYƏR) VARSA ONU İŞLƏDİR; YOXDURSA, `window.matchMedia('(prefers-color-scheme: light)')` İLƏ ƏMƏLİYYAT SİSTEMİNİN/BRAUZERİN ÖZ REJİMİNİ SORUŞUR. **DİQQƏT — `.matches ? 'dark' : 'light'`, TƏRSİNƏ DÜŞÜNÜLƏ BİLƏR GÖRÜNÜR:** `matchMedia('(prefers-color-scheme: light)').matches` DOĞRUDURSA (SİSTEM İŞIQLI REJİMDƏDİRSƏ), NƏTİCƏ `'dark'` OLUR — BU, SƏHV DEYİL, BİLƏRƏKDƏN BELƏDİR: KODUN ÖZÜNÜN ŞƏRHİNDƏ QEYD OLUNDUĞU KİMİ, LAYİHƏNİN DEFAULT (ƏSAS DİZAYN EDİLƏN) REJİMİ QARANLIQDIR, ONA GÖRƏ "SİSTEM AÇIQ-AŞKAR İŞIQLI REJİM İSTƏYİR" DEYİLMƏYİBSƏ BELƏ, TİPİK OLARAQ QARANLIQ REJİMLƏ BAŞLAMAQ SEÇİLİB.
- **`applyTheme(theme)`** — `document.documentElement.setAttribute('data-theme', theme)` — BÜTÜN SƏHİFƏNİN KÖK ELEMENTİNƏ (`<html>`) `data-theme="dark"` KİMİ BİR ATRİBUT QOYUR. **ƏSL RƏNG DƏYİŞİKLİYİNİ REACT YOX, CSS İDARƏ EDİR** — `index.css`-DƏ `:root[data-theme='dark'] { --color-bg: ...; }` KİMİ BİR "OVERRIDE" BLOKU VAR (Hissə 19-A BAXIN), VƏ BÜTÜN KOMPONENTLƏR ARTIQ `var(--color-bg)` KİMİ CSS DƏYİŞƏNLƏRİNDƏN İSTİFADƏ ETDİYİ ÜÇÜN, TƏK BİR ATRİBUTUN DƏYİŞMƏSİ BÜTÜN SAYTIN RƏNGİNİ AVTOMATİK YENİLƏYİR — HEÇ BİR KOMPONENTİN ÖZÜNDƏ "əgər dark-dırsa bu rəngi, yoxsa o birini göstər" KİMİ ŞƏRTİ MƏNTİQƏ EHTİYAC YOXDUR.
- **`create<ThemeState>((set, get) => {...})`** — Hissə 8-DƏ `useAuthStore`-DA GÖRDÜYÜMÜZ EYNİ ZUSTAND NÜMUNƏSİ: `set` STATE-İ YENİLƏYİR, `get()` STATE-İN CARİ DƏYƏRİNİ OXUYUR. **DİQQƏTƏLAYİQ NÖQTƏ:** `create(...)`-Ə VERİLƏN FUNKSİYANIN GÖVDƏSİNDƏ (`{ const initial = ...; applyTheme(initial); return {...} }`) YALNIZ `return`-DƏN ƏVVƏLKİ HİSSƏ **BİR DƏFƏ, MODUL YÜKLƏNƏNDƏ** İŞƏ DÜŞÜR — BU DA DEMƏKDİR Kİ, `applyTheme(initial)` (VƏ ONUNLA BİRLİKDƏ `data-theme` ATRİBUTUNUN QOYULMASI) TƏTBİQ HƏLƏ HEÇ BİR KOMPONENT RENDER ETMƏMİŞ, ƏN ƏVVƏLDƏN BAŞ VERİR — BU, "FLASH OF WRONG THEME" (QISA BİR AN YANLIŞ REJİMİN GÖRÜNMƏSİ) PROBLEMİNİN QARŞISINI ALIR.
- **`toggleTheme`** — `get().theme`-İ OXUYUB TƏRSİNƏ ÇEVİRİR, `applyTheme(next)` İLƏ HƏM `<html>` ATRİBUTUNU, HƏM `localStorage`-U YENİLƏYİR, SONRA `set({ theme: next })` İLƏ REACT-A "BU DƏYƏR DƏYİŞDİ, YENİDƏN RENDER ET" DEYİR (Kİ `Header`-DƏKİ İKON DA YENİLƏNSİN).

---

## Hissə 18: Səhifələr

### `src/pages/Login/` — TƏK SƏHİFƏLİK OLSA DA, `Categories`/`Orders` İLƏ EYNİ QAYDALARLA BÖLÜNMÜŞ

**KÖHNƏ VƏZİYYƏT NECƏ İDİ?** Tək bir `Login.tsx` faylı: 4 `useState` (telefon, parol, "parolu göstər", "yüklənir"), `FormEvent`-lə əl ilə yazılan `handleSubmit`, VƏ bütün JSX (illüstrasiya + forma) — HAMISI EYNİ FUNKSİYANIN İÇİNDƏ. Sonradan, `Categories`/`Campaigns`/`Products`/`Users` səhifələrini bölən EYNİ MƏNTİQ (Hissə 4-DƏKİ "Səhifə-daxili refactor" bölməsinə baxın) `Login`-ə də tətbiq olundu — FƏRQ, YALNIZ Login-də `queries/`/`constants/`/`table/`/`pagination/` YOXDUR (heç bir siyahı, heç bir CRUD mutasiyası, heç bir səhifələmə yoxdur, ona görə bu qovluqlar boş qalardı). Yekun qovluq ağacı:
```
Login/
├── index.tsx                          → səhifənin özü (Login.tsx YOX — Hissə 4-dəki 5 Protected
│                                          səhifənin "index.tsx birbaşa qovluq kökündə" qaydası bura da tətbiq olunub)
├── hooks/useLoginForm.ts              → react-hook-form + submit/toast + naviqasiya MƏNTİQİ
├── components/LoginForm/LoginForm.tsx → forma "qabığı" (iki sahəni + submit düyməsini birləşdirir)
├── components/PhoneField/PhoneField.tsx     → telefon sahəsi, ÖZ qovluğunda
├── components/PasswordField/PasswordField.tsx → parol sahəsi, ÖZ qovluğunda
└── styles/*.module.css                → 4 CSS faylı (Login/LoginForm/PhoneField/PasswordField)
```
**`components/` NİYƏ İKİ SƏVİYYƏYƏ YOX, TƏK SƏVİYYƏYƏ BÖLÜNÜB (`components/PhoneField/`, `components/LoginForm/components/PhoneField/` YOX)?** İlk versiyada `PhoneField`/`PasswordField` `LoginForm`-un ÖZ qovluğunun İÇİNDƏ (`components/LoginForm/components/...`) idi — bu, `Orders/components/OrderDetails.tsx`+`OrderProductRow.tsx` KİMİ "yalnız bir yerdən istifadə olunan alt-hissələr bir CSS-i paylaşsın" məntiqinə əsaslanırdı. AMMA SONRADAN, "hər komponent ÖZ qovluğunda olsun, `components/` içində İKİNCİ bir `components/` olmasın" TƏLƏBİ İLƏ, `PhoneField`/`PasswordField` `LoginForm`-la EYNİ SƏVİYYƏYƏ (`components/`-in birbaşa altına) ÇIXARILDI — indi ÜÇÜ DƏ BİR-BİRİNİN "BACISI" (sibling), heç biri o birinin İÇİNDƏ DEYİL.

**`hooks/useLoginForm.ts` — bütün forma MƏNTİQİ, TEK yerdə:**
```ts
export function useLoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({ defaultValues: { phone: '', password: '' } })

  const onSubmit = async ({ phone, password }: LoginFormValues) => {
    try {
      await login(phone.trim(), password)
      toast.success('Hesaba uğurla daxil olundu')
      navigate('/sifarisler', { replace: true })
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Xəta baş verdi')
    }
  }

  const onInvalid = () => {
    toast.error('Telefon və parolu daxil edin')
  }

  return {
    register,
    submit: handleSubmit(onSubmit, onInvalid),
    isSubmitting,
    showPassword,
    togglePassword: () => setShowPassword((s) => !s),
  }
}
```
- **KÖHNƏ 4 `useState` + əl ilə yazılan `handleSubmit` İNDİ **`react-hook-form`**-A KEÇİB** — LAYİHƏDƏKİ BÜTÜN DİGƏR FORMALARLA (`CategoryForm`, `ProductForm`, `CampaignForm`, Hissə 18-in Categories bölməsinə baxın) EYNİ KİTABXANA, EYNİ NAXIŞ (`register`/`handleSubmit`). `useForm<LoginFormValues>({ defaultValues: {...} })` — `LoginFormValues` (`{ phone: string; password: string }`) `types/auth/`-DA TƏYİN OLUNUB (Hissə 5-Ə BAXIN); `defaultValues` OLMASA, `register`-Ə QOŞULMAMIŞ `<input>`-LAR "uncontrolled" BAŞLAYARDI.
- **`handleSubmit(onSubmit, onInvalid)` — react-hook-form-un `handleSubmit`-i İKİ ARQUMENT ALIR:** BİRİNCİ (`onSubmit`) — TƏSDİQ (validasiya) UĞURLU OLANDA ÇAĞIRILIR; İKİNCİ (`onInvalid`) — UĞURSUZ OLANDA. Bu, KÖHNƏ `if (!phone.trim() || !password.trim()) { toast.error(...); return }` SƏTRİNİN YERİNİ TUTUR — SADƏCƏ, YOXLAMA ARTIQ `register`-İN ÖZÜNDƏ (`validate: (v) => v.trim().length > 0`, AŞAĞIDA `PhoneField`/`PasswordField`-Ə BAXIN) OLUR, `onSubmit`-İN İÇİNDƏ YOX. Nəticə EYNİ: boş/yalnız boşluqlu sahə ilə göndərilsə, `toast.error('Telefon və parolu daxil edin')` GÖSTƏRİLİR, `login()` HEÇ ÇAĞIRILMIR — LAYİHƏNİN "İNLİNE XƏTA MƏTNİ YOX, YALNIZ TOAST" QAYDASI (Hissə 9-DAKI "Error handling"-ə BAXIN) BURADA DA QORUNUR, baxmayaraq ki, bu forma TanStack Query-yə BAĞLI DEYİL.
- **`submit: handleSubmit(onSubmit, onInvalid)`** — HOOK, ARTIQ "BAĞLANMIŞ" (bound) BİR FUNKSİYA QAYTARIR, `LoginForm.tsx` isə SADƏCƏ `<form onSubmit={submit}>` YAZIR — özü `handleSubmit(...)`-i ÇAĞIRMIR, BU SƏBƏBDƏN `LoginForm.tsx`-in ÖZÜNDƏ HEÇ BİR react-hook-form BİLİYİ TƏLƏB OLUNMUR.
- `await login(phone.trim(), password)` — `useAuthStore`-DAKI `login` FUNKSİYASI (Hissə 8-Ə BAXIN). UĞURLU OLSA: `toast.success(...)` + `navigate('/sifarisler', { replace: true })`. UĞURSUZ OLSA (`catch (err)`): `err instanceof Error ? err.message : 'Xəta baş verdi'` — Hissə 3-DƏ ƏTRAFLI İZAH OLUNAN, `catch`-DƏKİ `unknown` TİPİNİN "DARALDILMASI" MİSALI (`axiosInstance.ts` HƏMİŞƏ SADƏ BİR `Error` "ATDIĞI" ÜÇÜN PRAKTİKADA BU YOXLAMA HƏMİŞƏ DOĞRU ÇIXIR, AMMA TypeScript-Ə GÖRƏ `catch`-Ə İSTƏNİLƏN ŞEY DÜŞƏ BİLƏR).
- **KÖHNƏ `loading`/`setLoading(false)` (əl ilə) İNDİ `formState.isSubmitting`-DİR** — react-hook-form `onSubmit` `Promise` QAYTARDIĞI ÜÇÜN (`async` FUNKSİYADIR), `isSubmitting`-i ÖZÜ İDARƏ EDİR — `finally` BLOKUNA EHTİYAC QALMIR.

**`components/LoginForm/LoginForm.tsx` — forma "qabığı":**
```tsx
export default function LoginForm() {
  const { register, submit, isSubmitting, showPassword, togglePassword } = useLoginForm()

  return (
    <form onSubmit={submit} className="flex flex-col gap-6">
      <PhoneField register={register} />
      <PasswordField register={register} showPassword={showPassword} onToggle={togglePassword} />

      <Button type="submit" fullWidth className={styles.submitBtn} disabled={isSubmitting}>
        {isSubmitting ? 'Yoxlanılır...' : 'Daxil ol'}
      </Button>
    </form>
  )
}
```
- `useLoginForm()` — YUXARIDAKI HOOK ÇAĞIRILIR, NƏTİCƏSİ İKİ ALT-KOMPONENTƏ (`PhoneField`, `PasswordField`) VƏ SUBMİT DÜYMƏSİNƏ "PAYLANIR" — `Categories/index.tsx`-in `useCategoriesData`/`useCategoriesPage`-i 5 KOMPONENTƏ PAYLAMASI İLƏ EYNİ NAXIŞ (Hissə 4-Ə BAXIN).
- **`<Button type="submit" fullWidth ... disabled={isSubmitting}>`** — KÖHNƏ SADƏ `<button>` TEQİ İNDİ PAYLAŞILAN `shared/components/Button` KOMPONENTİDİR (Hissə 14-Ə BAXIN) — LAYİHƏDƏ ARTIQ HEÇ BİR SƏHİFƏDƏ ÇILPAQ (bare) `<button>` YAZILMIR, HAMISI BU KOMPONENTDƏN KEÇİR.

**`components/PhoneField/PhoneField.tsx`:**
```tsx
export default function PhoneField({ register }: LoginPhoneFieldProps) {
  return (
    <label className={`flex flex-col gap-2 ${styles.field}`}>
      Telefon
      <div className={`flex items-center ${styles.inputWrap}`}>
        <Phone size={18} className={styles.leadingIcon} />
        <input
          type="tel"
          placeholder="telefon"
          className={`${styles.input} ${styles.hasLeadingIcon}`}
          {...register('phone', { validate: (v) => v.trim().length > 0 })}
        />
      </div>
    </label>
  )
}
```
- **`{...register('phone', { validate: (v) => v.trim().length > 0 })}`** — `register(...)`, react-hook-form-un `name`, `onChange`, `onBlur`, `ref`-i BİR OBYEKTDƏ QAYTARAN FUNKSİYASIDIR (Hissə 2-DƏKİ SPREAD-Ə BAXIN, `{...obj}` BÜTÜN AÇAR/DƏYƏRLƏRİ `<input>`-A "SƏPƏLƏYİR"). `validate` — SADƏ `required: true`-DAN FƏRQLİ OLARAQ, YALNIZ BOŞ DEYİL, **YALNIZ BOŞLUQLARDAN İBARƏT** DƏYƏRİ DƏ RƏDD EDİR (`'   '.trim().length` → `0`) — KÖHNƏ `!phone.trim()` YOXLAMASI İLƏ EYNİ DAVRANIŞ.
- **`LoginPhoneFieldProps`** (`types/auth/LoginPhoneFieldProps.ts`) — TƏK SAHƏSİ `register: UseFormRegister<LoginFormValues>`-DİR (`UseFormRegister`, react-hook-form-un ÖZ TİPİDİR) — LAYİHƏNİN "HƏR KOMPONENTİN `Props`-U `src/types/`-DƏ YAŞAYIR" QAYDASINA UYĞUN (Hissə 5-Ə BAXIN), `PhoneField.tsx`-in ÖZÜNDƏ İNLAYN `interface` YOXDUR.

**`components/PasswordField/PasswordField.tsx`** — EYNİ NAXIŞ, ÜÇ FƏRQLƏ: (1) `type={showPassword ? 'text' : 'password'}` — KÖHNƏ Login.tsx-DƏKİ EYNİ TERNAR, İNDİ BURAYA KÖÇÜB; (2) sağda `Lock` İKONUNDAN ƏLAVƏ, `Eye`/`EyeOff` İKONLU BİR `Button` (`variant="ghost"`, `onClick={onToggle}`) VAR — `onToggle` `useLoginForm`-UN QAYTARDIĞI `togglePassword` FUNKSİYASIDIR, PROP OLARAQ ÖTÜRÜLÜB; (3) `LoginPasswordFieldProps` `register`-DƏN ƏLAVƏ `showPassword: boolean` VƏ `onToggle: () => void` DƏ DAŞIYIR (KOMPONENT ÖZÜ HEÇ BİR STATE SAXLAMIR, HAMISI `useLoginForm`-DAN GƏLİR).

**`index.tsx` — SƏHİFƏNİN ÖZÜ, İKİ SÜTUNLU "QABIQ":**
```tsx
export default function Login() {
  useTitle('Giriş')

  return (
    <div className={`overflow-hidden ${styles.page}`}>
      <div className={`flex flex-col ${styles.left}`}>
        {/* loqo + illüstrasiya */}
      </div>
      <div className={`flex items-center justify-center ${styles.right}`}>
        <div className={`flex flex-col gap-6 ${styles.formWrap}`}>
          <h2 className={`text-center ${styles.formTitle}`}>Admin Panel</h2>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
```
- `useTitle('Giriş')` — TAB BAŞLIĞINI "Giriş · Tik Tak Admin" EDİR (Hissə 15-Ə BAXIN).
- BÜTÜN FORMA MƏNTİQİ ARTIQ `<LoginForm/>`-UN İÇİNDƏ OLDUĞU ÜÇÜN, BU FAYLDA HEÇ BİR `useState`, HEÇ BİR `useForm`, HEÇ BİR `onSubmit` YOXDUR — SADƏCƏ TƏRTİBATDIR (Categories/index.tsx-in "yalnız orkestrasiya" XARAKTERİ İLƏ EYNİ, Hissə 4-Ə BAXIN).
- **`.right`-in `justify-center`-i** (əvvəllər `justify-start` İDİ) — FORMA SAĞ SÜTUNUN (`.page`-in `60fr 40fr` grid-İNDƏKİ 40fr-lik hissə) MƏRKƏZİNDƏ OTURSUN DEYƏ SONRADAN DƏYİŞDİRİLİB: sütun ÖZÜ DAR (40%) OLDUĞU ÜÇÜN, MƏRKƏZLƏŞDİRMƏ FORMANI ORTA SƏRHƏD XƏTTİNƏ (`.left`-in `border-right`-İNƏ) BELƏ YAXIN SAXLAYIR — `justify-start` İSƏ FORMANI SƏRHƏDƏ ÇOX YAXIN, GENİŞ EKRANDA İSƏ SAĞ TƏRƏFDƏ BOŞ YER QALACAQ ŞƏKİLDƏ İTƏLƏYİRDİ.
- `styles/Login.module.css`-DƏKİ `.formWrap`-in `max-width`-İ (490px) VƏ `PhoneField`/`PasswordField`/`LoginForm`-un `.input`/`.field`/`.submitBtn` ÖLÇÜLƏRİ (padding, şrift ölçüsü) HAMISI SONRADAN, SADƏCƏ VİZUAL OLARAQ, BÖYÜDÜLÜB — FUNKSİONAL HEÇ BİR TƏSİRİ YOXDUR.

**`styles/` — HƏR 4 CSS FAYLI TƏK QOVLUQDA, `Categories`/`Products` KİMİ:** `Login.module.css` (səhifə "qabığı"), `LoginForm.module.css` (yalnız `.submitBtn`), `PhoneField.module.css`, `PasswordField.module.css`. SONUNCU İKİSİ, `.field`/`.inputWrap`/`.input`/`.hasLeadingIcon`/`.leadingIcon` KİMİ ORTAQ SİNİFLƏRİ BİR-BİRİNDƏN AYRI, HƏR BİRİNDƏ TƏKRAR YAZIR (paylaşılan tək fayla ÇIXARMIR) — SƏBƏBİ, `Users`-in `.roleBadge`-İNİN İKİ YERDƏ TƏKRARLANMASI İLƏ EYNİDİR (Hissə 18-in Users bölməsinə baxın): CSS Modules SİNİF ADLARINI FAYL-BAZALI "GİZLƏDİR" (scope edir), ONA GÖRƏ TƏKRAR HEÇ BİR ZƏRƏR VERMİR, ƏVƏZİNDƏ HƏR KOMPONENTİ ÖZ-ÖZLÜYÜNDƏ TAM SAXLAYIR (BAŞQA FAYLA BAXMADAN OXUNA BİLƏN EDİR).

### `src/pages/NotFound/NotFound.tsx`

ÇOX SADƏDİR — 404 İKONU, MƏTN, VƏ "ANA SƏHİFƏYƏ QAYIT" DÜYMƏSİ (`useNavigate()` İLƏ, ÇÜNKİ BU BİR FUNKSİYA KOMPONENTDİR, `ErrorBoundary`-DƏN FƏRQLİ OLARAQ HOOK İŞLƏDƏ BİLİR). HEÇ BİR ƏLAVƏ TİP YAZILMAYIB — KOMPONENTİN PROP-U YOXDUR.

### `src/pages/Protected/Categories/` — CƏMİYYƏTİN ƏSAS CRUD NÜMUNƏSİ, 11 FAYLA BÖLÜNMÜŞ

BU SƏHİFƏ, "CRUD" (Create/Read/Update/Delete — Yarat/Oxu/Yenilə/Sil) NÜMUNƏSİNİN ƏN TİPİK MİSALIDIR — CAMPAIGNS VƏ PRODUCTS SƏHİFƏLƏRİ DƏ EYNİ QURULUŞU TƏKRARLAYIR (KİÇİK FƏRQLƏRLƏ). BU FAYLLARIN NİYƏ BÖLÜNDÜYÜ Hissə 4-də ("Səhifə-daxili refactor" bölməsi) ÜMUMİ ŞƏKİLDƏ izah olunub — BURADA HƏR FAYLIN ÖZÜNÜ, KOD SƏTİR-SƏTİR, GƏZƏCƏYİK.

**`index.tsx` — səhifənin özü, YALNIZ orkestrasiya:**
```tsx
export default function Categories() {
  useTitle('Kateqoriyalar')
  const { search } = useOutletContext<LayoutOutletContext>()

  const { loading, filtered, page, setPage, pageSize, paged } = useCategoriesData(search)
  const {
    formOpen, setFormOpen, editing, defaultValues, deleteTarget, setDeleteTarget,
    viewTarget, setViewTarget, openCreate, openEdit, submitting, handleSubmit, confirmDelete,
  } = useCategoriesPage()

  return (
    <div>
      {/* başlıq + "Yeni Kateqoriya" düyməsi */}
      <CategoriesTable items={paged} page={page} pageSize={pageSize} loading={loading} onView={setViewTarget} onEdit={openEdit} onDelete={setDeleteTarget} />
      <CategoriesPagination page={page} pageSize={pageSize} total={filtered.length} onPageChange={setPage} />
      <CategoryForm open={formOpen} onClose={() => setFormOpen(false)} editing={editing} defaultValues={defaultValues} submitting={submitting} onSubmit={handleSubmit} />
      <ConfirmModal open={!!deleteTarget} onCancel={() => setDeleteTarget(null)} onConfirm={confirmDelete} message="Məlumatı silməyə əminsinizmi?" />
      <CategoryDetails category={viewTarget} onClose={() => setViewTarget(null)} />
    </div>
  )
}
```
- İKİ HOOK ÇAĞIRILIR (`useCategoriesData`, `useCategoriesPage`), NƏTİCƏLƏRİ 5 KOMPONENTƏ (`CategoriesTable`, `CategoriesPagination`, `CategoryForm`, `ConfirmModal`, `CategoryDetails`) "PAYLANIR" — bu faylda heç bir `useQuery`, `useMutation`, JSX-daxili `onChange` YOXDUR. Bu, KÖHNƏ 224-sətirlik TƏK fayldan qalan, YALNIZ "TƏRTİBAT" (layout) hissəsidir.

**`queries/useCategoriesData.ts` — siyahı, axtarış, səhifələmə:**
```ts
export function useCategoriesData(search: string) {
  const { data: categories = [], isLoading: loading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => listCategories().then((data) => data.map(mapCategoryFromApi)),
  })

  const filtered = useMemo(
    () => categories.filter((c) => `${c.name} ${c.description}`.toLocaleLowerCase('az').includes(search.toLocaleLowerCase('az'))),
    [categories, search],
  )
  // 7, not usePagination's own default of 5 — 5 rows left visible dead space
  // below the table before Pagination, since the page chrome comfortably
  // fits 7 rows at typical viewport heights.
  const { page, setPage, pageSize, paged } = usePagination(filtered, 7)

  return { loading, filtered, page, setPage, pageSize, paged }
}
```
- `useQuery({ queryKey: ['categories'], queryFn: ... })` — TANSTACK QUERY-NİN ƏSAS HOOK-UDUR. `queryFn`-İN NƏTİCƏSİ AVTOMATİK OLARAQ `Category[]`-DİR (ÇÜNKİ `listCategories(): Promise<CategoryApi[]>`, `.map(mapCategoryFromApi)` İSƏ HƏR ELEMENTİ `CategoryApi`-DƏN `Category`-YƏ ÇEVİRİR) — HEÇ BİR ƏLAVƏ TİP YAZILMASINA EHTİYAC QALMIR (`useQuery<Category[]>(...)` YAZMAQ LAZIM DEYİL — CLAUDE.md-DƏ QEYD OLUNUB: TİPLƏR ARTIQ `services`/`adapters`-DAN "AXIR").
- **`.toLocaleLowerCase('az')`, NİYƏ SADƏ `.toLowerCase()` YOX?** BU, KODDA TAPILAN VƏ DÜZƏLDİLƏN REAL BİR BUQ İDİ: JavaScript-in ADİ `.toLowerCase()` FUNKSİYASI, AZƏRBAYCAN ƏLİFBASININ BÖYÜK **İ** HƏRFİNİ SƏHV KİÇİLDİR — `'İlkin'.toLowerCase()` NƏTİCƏSİ SADƏ `'ilkin'` DEYİL, **`'i̇lkin'`** OLUR — ÇÜNKİ `.toLowerCase()` İNGİLİS DİLİ QAYDALARINA GÖRƏ İŞLƏYİR. `.toLocaleLowerCase('az')` İSƏ AZƏRBAYCAN DİLİ QAYDALARINA GÖRƏ KİÇİLDİR (`İ` → `i`, DÜZGÜN) — BUNA GÖRƏ LAYİHƏNİN BÜTÜN AXTARIŞ FİLTRLƏRİNDƏ MƏHZ BU İŞLƏDİLİR.
- `usePagination(filtered, 7)` — Hissə 15-Ə BAXIN, `T = Category` OLARAQ İŞLƏYİR. **İKİNCİ ARQUMENT `7`** — DEFAULT `5` ƏVƏZİNƏ — KODUN ÖZÜNDƏKİ ŞƏRHDƏ İZAH OLUNAN BİR VİZUAL QƏRARDIR: 5 SƏTİR SƏHİFƏNİN AŞAĞISINDA BOŞ YER BURAXIRDI, 7 SƏTİR SƏHİFƏ "ÇƏRÇİVƏSİNƏ" (chrome) DAHA YAXŞI OTURUR.

**`queries/useCategoryMutations.ts` — yarat/yenilə/sil, ARTIQ AYRI FAYLDA:**
```ts
export function useCategoryMutations() {
  const queryClient = useQueryClient()
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['categories'] })

  const createMutation = useMutation({
    mutationFn: createCategory,
    // Not awaited: mutateAsync (useCategoriesPage.ts) yalnız bu onSuccess-in
    // özü bitəndə "resolve" olur, səhifə isə modalı elə bundan dərhal sonra
    // bağlayır — invalidate()-i await etsəydik, modal HƏM yazma, HƏM DƏ onun
    // tətiklədiyi refetch bitənə qədər açıq qalardı.
    onSuccess: () => {
      invalidate()
      toast.success('Kateqoriya yaradıldı')
    },
  })
  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: CategoryPayload }) => updateCategory(id, payload),
    onSuccess: () => { invalidate(); toast.success('Kateqoriya yeniləndi') },
  })
  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => { invalidate(); toast.success('Kateqoriya silindi') },
  })

  return { createMutation, updateMutation, deleteMutation }
}
```
- **NİYƏ AYRI FAYL, `useCategoriesData.ts`-İN İÇİNDƏ YOX?** Çünki BİRİ (`useCategoriesData`) SERVERDƏN OXUYUR, O BİRİ (`useCategoryMutations`) SERVERƏ YAZIR — Hissə 4-dəki cədvələ baxın, `queries/` qovluğu bunların İKİSİNİ DƏ tutur, AMMA İKİ AYRI FAYLDA, ÇÜNKİ `useCategoriesData` `search` PARAMETRİ ALIR VƏ SƏHİFƏLƏMƏ QAYTARIR (YALNIZ `index.tsx`-Ə LAZIMDIR), `useCategoryMutations` İSƏ HEÇ BİR ARQUMENT ALMIR VƏ `hooks/useCategoriesPage.ts`-Ə LAZIMDIR (AŞAĞIYA BAXIN) — İKİSİNİN "İSTİFADƏÇİLƏRİ" FƏRQLİDİR.
- **`onSuccess: () => { invalidate(); ... }` — `await invalidate()` YOX:** Bu, KÖHNƏ VERSİYADAN (`await invalidate()`) FƏRQLİDİR, VƏ SƏBƏBİ KODUN ÖZÜNDƏ ŞƏRH KİMİ YAZILIB: `mutateAsync` (aşağıda, `useCategoriesPage.ts`-də) YALNIZ BU `onSuccess`-İN ÖZÜ "RESOLVE" OLANDA NƏTİCƏ QAYTARIR — ƏGƏR `invalidate()` (YENİ SORĞUNU TƏTİKLƏYƏN FUNKSİYA) `await` EDİLSƏYDİ, SƏHİFƏ MODALI BAĞLAMAZDAN ƏVVƏL HƏM YAZMA ƏMƏLİYYATINI, HƏM DƏ ONUN TƏTİKLƏDİYİ YENİDƏN-ÇƏKMƏNİ GÖZLƏMƏLİ OLARDI (İKİ ŞƏBƏKƏ GEDİŞİ, ARDICIL) — `invalidate()`-İ GÖZLƏMƏDƏN ÇAĞIRMAQ, MODALIN YAZMA UĞURLU OLAN KİMİ BAĞLANMASINA İMKAN VERİR, SİYAHI İSƏ BİR AZ SONRA, ARXA PLANDA TƏZƏLƏNİR.

**`hooks/useCategoriesPage.ts` — modal state + submit/delete axını:**
```ts
const toForm = (item: Category): CategoryFormValues => ({
  image: item.image, color: item.color, imageUrl: item.imageUrl || '',
  name: item.name, description: item.description,
})

export function useCategoriesPage() {
  const { createMutation, updateMutation, deleteMutation } = useCategoryMutations()
  const { formOpen, setFormOpen, editing, deleteTarget, setDeleteTarget, viewTarget, setViewTarget, openCreate, openEdit } =
    useCrudModal<Category, CategoryFormValues>(emptyForm, toForm)

  const handleSubmit = async (form: CategoryFormValues) => {
    try {
      const payload = mapCategoryToApi(form)
      if (editing) {
        await updateMutation.mutateAsync({ id: editing.id, payload })
      } else {
        await createMutation.mutateAsync(payload)
      }
      setFormOpen(false)
    } catch {
      // error already toasted by the global mutation cache
    }
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    try {
      await deleteMutation.mutateAsync(deleteTarget.id)
    } catch {
      // error already toasted by the global mutation cache
    } finally {
      setDeleteTarget(null)
    }
  }

  return {
    formOpen, setFormOpen, editing, defaultValues: editing ? toForm(editing) : emptyForm,
    deleteTarget, setDeleteTarget, viewTarget, setViewTarget, openCreate, openEdit,
    submitting: createMutation.isPending || updateMutation.isPending,
    handleSubmit, confirmDelete,
  }
}
```
- **BU HOOK-UN VƏZİFƏSİ:** `useCategoryMutations`-UN QAYTARDIĞI 3 MUTASİYA İLƏ `useCrudModal`-UN (Hissə 15-ə baxın) QAYTARDIĞI MODAL STATE-İ ARASINDAKI "KÖRPÜ"DÜR — HEÇ BİRİ TƏKBAŞINA BİLMİR ("mutasiyalar" server ilə NECƏ danışacağını bilir, "modal state" isə HANSI modal açıqdır bilir, AMMA "FORMA GÖNDƏRİLƏNDƏ HANSI MUTASİYA ÇAĞIRILSIN" MƏNTİQİ İKİSİNİN ARASINDA, MƏHZ BURADA yaşayır).
- **`handleSubmit(form: CategoryFormValues)` — İNDİ `FormEvent` ALMIR, BİRBAŞA `form` ALIR:** BU, KÖHNƏ VERSİYADAN FƏRQLİDİR (Hissə 18-in əvvəlki halında `handleSubmit = async (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); ... }` idi) — SƏBƏB, FORMANIN ARTIQ react-hook-form İLƏ İDARƏ OLUNMASIDIR: `CategoryForm.tsx` (aşağıda) ÖZÜ `handleSubmit(onSubmit)` (react-hook-form-un ÖZ FUNKSİYASI, ADI TALE OLARAQ EYNİDİR, AMMA FƏRQLİ BİR ŞEYDİR) ÇAĞIRIR VƏ `e.preventDefault()`-Ü ARTIQ ÖZÜ EDİR — bu hook-a YALNIZ TƏMİZLƏNMİŞ `form` DƏYƏRİ ÇATIR.
- **`defaultValues: editing ? toForm(editing) : emptyForm`** — react-hook-form-un `defaultValues` PARAMETRİ ÜÇÜN HESABLANIR (aşağıda `CategoryForm.tsx`-də İSTİFADƏ OLUNUR) — KÖHNƏ VERSİYADA BU, `useCrudModal`-UN ÖZÜNÜN SAXLADIĞI `form`/`setForm` STATE-İ İDİ, İNDİ İSƏ SADƏCƏ BİR DƏFƏLİK "BAŞLANĞIC DƏYƏR" HESABLANIR — ÇÜNKİ FORMANIN ÖZ CARİ DƏYƏRLƏRİNİ ARTIQ react-hook-form ÖZÜ (ÖZ DAXİLİ STATE-İNDƏ) SAXLAYIR, `useCategoriesPage`-Ə BUNU TƏKRAR SAXLAMAĞA EHTİYAC QALMAYIB.
- QALAN HƏR ŞEY (`if (editing) {...} else {...}`, BOŞ `catch {}`, `confirmDelete`-DƏKİ `if (!deleteTarget) return`, `submitting`) KÖHNƏ VERSİYA İLƏ EYNİ MƏNTİQDƏDİR — SADƏCƏ İNDİ ÖZ FAYLINDADIR.

**`constants/emptyForm.ts`:**
```ts
export const emptyForm: CategoryFormValues = { image: '🏷️', color: '#f3f4f6', imageUrl: '', name: '', description: '' }
```
Tək bir sabit — AMMA ÖZ FAYLINDA, ÇÜNKİ HƏM `hooks/useCategoriesPage.ts` (default dəyər kimi), HƏM DƏ, DOLAYI YOLLA, `CategoryForm.tsx` (react-hook-form-un `defaultValues`-i vasitəsilə) BUNA EHTİYAC DUYUR — TİP AÇIQ YAZILIB (`: CategoryFormValues`) Kİ, HANSISA SAHƏNİ UNUTSANIZ, TypeScript DƏRHAL TUTSUN.

**`components/CategoryForm/CategoryForm.tsx` — forma modalı, react-hook-form İLƏ:**
```tsx
export default function CategoryForm({ open, onClose, editing, defaultValues, submitting, onSubmit }: CategoryFormProps) {
  const { register, handleSubmit, reset } = useForm<CategoryFormValues>({ defaultValues })

  // react-hook-form only reads `defaultValues` once, on mount — reset it
  // explicitly whenever the modal (re)opens so switching between "create" and
  // "edit <item>" (or between two different items) doesn't reuse stale values.
  useEffect(() => {
    if (open) reset(defaultValues)
  }, [open, defaultValues, reset])

  return (
    <Modal open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField label="Şəkil ünvanı">
          <FormInput placeholder="https://..." {...register('imageUrl')} />
        </FormField>
        <FormField label="Ad">
          <FormInput {...register('name', { required: true })} />
        </FormField>
        <FormField label="Açıqlama">
          <FormTextarea rows={3} {...register('description', { required: true })} />
        </FormField>
        <Button type="submit" fullWidth className={styles.submitBtn} disabled={submitting}>
          {submitting ? 'Göndərilir...' : editing ? 'Məlumatları yenilə' : 'Məlumatları yarat'}
        </Button>
      </form>
    </Modal>
  )
}
```
- **BU, LAYİHƏNİN ƏN BÖYÜK FORMA-DAXİLİ DƏYİŞİKLİYİDİR** — KÖHNƏ VERSİYADA HƏR `<input>` ÜÇÜN `value={form.X}` + `onChange={(e) => setForm((f) => ({ ...f, X: e.target.value }))}` YAZILIRDI ("CONTROLLED INPUT", Hissə 2-yə baxın); İNDİ İSƏ **react-hook-form** İDARƏ EDİR — HƏR SAHƏ ÜÇÜN `useState` YOXDUR, SADƏCƏ `{...register('imageUrl')}` YAZILIR.
- **`useForm<CategoryFormValues>({ defaultValues })`** — Hissə 3-dəki GENERİK: "bu formanın DƏYƏRLƏRİ `CategoryFormValues` FORMASINDA OLACAQ" deyir. Nəticə obyektindən `register`/`handleSubmit`/`reset` DESTRUCTURE olunur.
- **`register('imageUrl')`** — react-hook-form-un ƏSAS FUNKSİYASI: `{ name: 'imageUrl', onChange, onBlur, ref }` FORMASINDA BİR OBYEKT QAYTARIR, `{...register(...)}` İLƏ BUNLAR BİRBAŞA `<FormInput>`-A "TÖKÜLÜR" (SPREAD, Hissə 2-yə baxın) — NƏTİCƏDƏ, HƏR HƏRFDƏ REACT-IN ÖZÜNÜ YENİDƏN RENDER ETMƏSİNƏ EHTİYAC QALMIR (react-hook-form DAXİLİ OLARAQ "uncontrolled" (nəzarətsiz) input-larla işləyir, DOM-un ÖZÜNÜ birbaşa oxuyur) — BÖYÜK FORMALARDA BU, PERFORMANS ÜSTÜNLÜYÜ VERİR.
- **`register('name', { required: true })`** — İKİNCİ ARQUMENT, VALİDASİYA QAYDALARIDIR — KÖHNƏ VERSİYADA BU, HTML-in ÖZ `required` ATRİBUTU İLƏ (`<input required />`) EDİLİRDİ, İNDİ İSƏ react-hook-form-UN ÖZÜ İDARƏ EDİR (EYNİ NƏTİCƏ, AMMA FORMANIN VALİDASİYA MƏNTİQİ BİR YERDƏ TOPLANIR).
- **`useEffect(() => { if (open) reset(defaultValues) }, [open, defaultValues, reset])`** — BU, react-hook-form-A KEÇİDİN "GİZLİ" BİR TƏLƏBİDİR, KODUN ÖZÜNDƏKİ ŞƏRHDƏ İZAH OLUNUB: react-hook-form `defaultValues`-i YALNIZ KOMPONENT İLK DƏFƏ MOUNT OLANDA OXUYUR — MODAL BAĞLANIB-AÇILANDA (`open` DƏYİŞƏNDƏ) TypeScript/React BUNU AVTOMATİK YENİLƏMİR, ONA GÖRƏ, MODAL HƏR AÇILANDA (`if (open)`), `reset(defaultValues)` ƏL İLƏ ÇAĞIRILIR — BUNSUZ, "YARAT" REJİMİNDƏN SONRA "DÜZƏLT" REJİMİNƏ (VƏ YA İKİ FƏRQLİ ELEMENTİ DÜZƏLTMƏ ARASINDA) KEÇƏNDƏ, FORMA KÖHNƏ (STALE) DƏYƏRLƏRİ GÖSTƏRƏRDİ.
- **`handleSubmit(onSubmit)`** — DİQQƏT, BU `handleSubmit`, `hooks/useCategoriesPage.ts`-dəki `handleSubmit`-DƏN FƏRQLİ BİR ŞEYDİR (EYNİ AD, FƏRQLİ MƏNBƏ) — BU, react-hook-form-UN ÖZ FUNKSİYASIDIR: FORMA GÖNDƏRİLƏNDƏ, ƏVVƏLCƏ ÖZ VALİDASİYASINI (MƏS. `required`) YOXLAYIR, YALNIZ KEÇSƏ, `onSubmit` (BİZİM VERDİYİMİZ, `CategoryFormValues` ALAN FUNKSİYA) ÇAĞIRILIR — VƏ `e.preventDefault()`-Ü DƏ ÖZÜ EDİR, BİZ ARTIQ BUNU ƏL İLƏ YAZMIRIQ.

**`components/CategoryDetails/CategoryDetails.tsx`** — DƏYİŞMƏYİB (SADƏCƏ ÖZ QOVLUĞUNA KÖÇÜB) — `<Modal>` İÇİNDƏ, `viewTarget`-in sahələrini göstərən statik JSX.

**`table/columns/columns.ts` + `table/columns/widths.ts` + `table/components/CategoriesTable.tsx`:**
```ts
// table/columns/widths.ts — enlər ÖZ FAYLINDA, ÇÜNKİ TEZ-TEZ, sütun tərifindən ASILI OLMADAN "tənzimlənir"
export const NO_WIDTH = '5%'
export const IMAGE_WIDTH = '5%'
export const NAME_WIDTH = '20%'
export const DESC_WIDTH = '48%'
export const DATE_WIDTH = '10%'
export const ACTION_WIDTH = '8%'

// table/columns/columns.ts
export const categoryColumns: Column[] = [
  { key: 'no', label: 'Sıra', width: NO_WIDTH },
  { key: 'image', label: 'Şəkil', width: IMAGE_WIDTH },
  { key: 'name', label: 'Ad', width: NAME_WIDTH },
  { key: 'desc', label: 'Açıqlama', width: DESC_WIDTH },
  { key: 'date', label: 'Tarix', width: DATE_WIDTH },
  { key: 'action', label: 'Əməliyyatlar', width: ACTION_WIDTH },
]
```
- **NİYƏ ENLƏR SÜTUN TƏRİFİNDƏN AYRI FAYLDA?** KODUN ÖZÜNDƏKİ ŞƏRH BUNU AÇIQ İZAH EDİR: BU RƏQƏMLƏR DİZAYN GERİ-BİLDİRİMİNƏ GÖRƏ DƏFƏLƏRLƏ "İRƏLİ-GERİ" DƏYİŞDİRİLİB (MƏS. "Ad" sütunu ƏVVƏLCƏ daha geniş idi, sonra 20%-ə endirilib; "Əməliyyatlar" 6%-ə endirilib, sonra yenidən 8%-ə qaldırılıb) — BU DƏYİŞİKLİKLƏR `columns.ts`-in ÖZÜNÜ (SÜTUNLARIN HANSI SIRAYLA, HANSI AÇARLA olduğunu) TOXUNMADAN aparıla bilsin deyə, RƏQƏMLƏR AYRI BİR FAYLA ÇIXARILIB. **DİQQƏT** — bu enlər `Campaigns/table/columns/widths.ts`-dəki İLƏ SƏTİR-SƏTİR EYNİDİR (İKİ SƏHİFƏNİN CƏDVƏLİ EYNİ VİZUAL "HİSS" versin deyə, BİLƏRƏKDƏN belə saxlanılıb).
```tsx
// table/components/CategoriesTable.tsx
export default function CategoriesTable({ items, page, pageSize, loading, onView, onEdit, onDelete }: CategoriesTableProps) {
  return (
    <Table columns={categoryColumns} minWidth={720}>
      {items.map((item, idx) => (
        <tr key={item.id}>
          <td>{(page - 1) * pageSize + idx + 1}</td>
          <td><Thumbnail imageUrl={item.imageUrl} image={item.image} color={item.color} /></td>
          <td className={styles.nameCell}>{item.name}</td>
          <td className={styles.descCell}>{item.description}</td>
          <td>{item.date}</td>
          <td><ActionMenu onView={() => onView(item)} onEdit={() => onEdit(item)} onDelete={() => onDelete(item)} /></td>
        </tr>
      ))}
      {!loading && items.length === 0 && <TableEmptyRow colSpan={categoryColumns.length} />}
    </Table>
  )
}
```
KÖHNƏ VERSİYADAN MƏNTİQƏN FƏRQLİ DEYİL — TƏK FƏRQ, BU CƏDVƏLİN, İNDİ `items`/`onView`/`onEdit`/`onDelete` KİMİ PROP-LAR ALAN, ÖZBAŞINA BİR KOMPONENT OLMASIDIR (`index.tsx`-in ÖZÜNDƏ, `{paged.map(...)}` OLARAQ İNLİNE YAZILMIR).

**`pagination/CategoriesPagination.tsx`** — Hissə 16-da tam izah olunub (nazik sarğı).

### `Campaigns` və `Products` — Categories ilə eyni SKELET, kiçik FƏRQLƏRLƏ

**`Campaigns`** — QOVLUQ QURULUŞU 1:1 EYNİDİR (`hooks/useCampaignsPage.ts`, `queries/useCampaignsData.ts`+`useCampaignMutations.ts`, `constants/emptyForm.ts`, `components/CampaignForm/`+`CampaignDetails/`, `table/`, `pagination/`), SADƏCƏ:
- `name`/`description` ƏVƏZİNƏ `title`/`description` (KAMPANİYALARIN "ADI" API-DƏ `title` ADLANIR) — `CampaignForm`, Hissə 5-Ə BAXIN, `name` YOX, `title` SAHƏSİ VAR.
- `useCrudModal<Campaign, CampaignForm>(emptyForm, toForm)` — TİPLƏR FƏRQLİDİR, MƏNTİQ EYNİDİR.

**`Products`** — EYNİ QURULUŞ + ƏLAVƏ MÜRƏKKƏBLİK, `queries/useProductsData.ts`-in İÇİNDƏ:
```ts
const { data: categoryOptions = [] } = useQuery({
  queryKey: ['categories'],
  queryFn: () => listCategories().then((data) => data.map(mapCategoryFromApi)),
})
```
- İKİNCİ BİR `useQuery` ÇAĞIRIŞI VAR — MƏHSUL FORMASINDAKI "KATEQORİYA" DROPDOWN-U ÜÇÜN. `queryKey: ['categories']` — BU, `Categories` SƏHİFƏSİNİN İSTİFADƏ ETDİYİ **EYNİ AÇARDIR** — TANSTACK QUERY BUNU GÖRÜB İKİ AYRI SORĞU YERİNƏ BİR DƏFƏ ÇƏKİB PAYLAŞIR. **VƏ MƏHZ EYNİ `queryFn` İŞLƏDİLMƏLİDİR**, TypeScript BUNU MƏCBUR ETMİR, AMMA CLAUDE.md-DƏ SƏNƏDLƏŞDİRİLƏN QAYDADIR.
```tsx
<Button icon={Plus} onClick={() => openCreate({ category_id: categoryOptions[0]?.id ?? '' })}>Yeni Məhsul</Button>
```
- `openCreate` FUNKSİYASINA `{ category_id: categoryOptions[0]?.id ?? '' }` VERİLİR (`useCrudModal`-DAKI `overrides: Partial<ProductForm>` PARAMETRİ, Hissə 15-Ə BAXIN) — YENİ MƏHSUL FORMASI AÇILANDA, DROPDOWN-DA BİRİNCİ KATEQORİYA AVTOMATİK SEÇİLİ GƏLSİN DEYƏ. `categoryOptions[0]?.id ?? ''` — `categoryOptions[0]` (Hissə 3-DƏKİ `noUncheckedIndexedAccess` AYARINA GÖRƏ) `undefined` DƏ OLA BİLƏR (SİYAHI BOŞ OLA BİLƏR), ONA GÖRƏ `?.id` (OPTIONAL CHAINING) + `?? ''` (NULLİSH COALESCING) LAZIM GƏLİB.
- TİP (`Növ`) DROPDOWN-U `FormSelect` + `PRODUCT_TYPE_OPTIONS`-DAN QURULUR (Hissə 11-Ə BAXIN), `{...register('type')}` İLƏ react-hook-form-A QOŞULUR — KÖHNƏ VERSİYADA BURADA `as ProductType` VAR İDİ (`<select>`-in `onChange`-i HƏMİŞƏ `string` QAYTARDIĞI ÜÇÜN), react-hook-form-A KEÇDİKDƏN SONRA BU AS-A EHTİYAC QALMAYIB (`register`-in ÖZÜ, `useForm<ProductForm>`-DAN GƏLƏN GENERİK SAYƏSİNDƏ, SAHƏNİN TİPİNİ ARTIQ BİLİR). BADGE RƏNGİ `productTypeBadgeColor(item.type)` FUNKSİYASI İLƏ TƏYİN OLUNUR.

### `src/pages/Protected/Orders/` — FƏRQLİ NÜMUNƏ, ARTIQ tanstack-table ÜZƏRİNDƏ QURULUB

BU SƏHİFƏ `ActionMenu`/`useCrudModal` İŞLƏTMİR (BİLƏRƏKDƏN, LAYİHƏNİN DİZAYN QƏRARIDIR) — SADƏ "Göstər" DÜYMƏSİ + DETAL MODALI VAR, VƏ YARATMA/SİLMƏ YOXDUR, YALNIZ **STATUS DƏYİŞDİRMƏ**. Bu, HƏM DƏ FAYL BÖLGÜSÜNƏ DƏ ƏKS OLUNUB: `hooks/` (səhifə-səviyyəli) YOXDUR (Categories-dəki KİMİ modal-state idarə edəcək heç nə yoxdur), ƏVƏZİNƏ CƏDVƏLİN ÖZÜNÜN mürəkkəbliyinə görə `table/hooks/` VAR.

**`index.tsx`:**
```tsx
export default function Orders() {
  useTitle('Sifarişlər')
  const { search } = useOutletContext<LayoutOutletContext>()

  const { orders, loading, stats } = useOrdersData()
  const { updateStatus } = useOrderMutations()

  const [selectedId, setSelectedId] = useState<number | null>(null)
  const selected = orders.find((o) => o.id === selectedId) ?? null

  const { rows, columns } = useOrdersTable(orders, search, setSelectedId)
  const { page, setPage, pageSize, setPageSize, paged } = usePagination(rows)

  return (
    <div>
      <h2 className={styles.heading}>Sifarişlər</h2>
      {loading && <Loading />}
      <div className={styles.stats}>
        {ORDER_STAT_CARDS.map(({ key, label, icon, color }) => (
          <StatCard key={key} label={label} value={stats[key]} icon={icon} color={color} />
        ))}
      </div>
      <OrdersTable columns={columns} rows={paged} loading={loading} />
      <OrdersPagination page={page} pageSize={pageSize} total={rows.length} onPageChange={setPage} onPageSizeChange={setPageSize} />
      <OrderDetails order={selected} onClose={() => setSelectedId(null)} onStatusChange={updateStatus} />
    </div>
  )
}
```
- **İKİ HOOK ÇAĞIRILIR:** `useOrdersData()` (server-oxuma) VƏ `useOrderMutations()` (status yeniləmə) — Categories-dəki KİMİ BİR "modal state" hook-u (`useOrdersPage` KİMİ) YOXDUR, ÇÜNKİ İDARƏ OLUNACAQ MODAL STATE-İ (formOpen/editing/deleteTarget) BU SƏHİFƏDƏ SADƏCƏ MÖVCUD DEYİL.
- `useOrdersTable(orders, search, setSelectedId)` — BÜTÜN CƏDVƏL MƏNTİQİNİ (SIRALAMA, 4 FİLTR, SÜTUN TƏRİFLƏRİ) BİR HOOK-A CƏMLƏYİR, `rows` (FİLTRLƏNİB-SIRALANMIŞ SİFARİŞLƏR) VƏ `columns` (`Table`-in gözlədiyi sadə `Column[]`) QAYTARIR — AŞAĞIDA ƏTRAFLI.
- `usePagination(rows)` — DİQQƏT, `usePagination(orders)` YOX, `usePagination(rows)` — SƏHİFƏLƏMƏ, `useOrdersTable`-İN ARTIQ FİLTRLƏYİB-SIRALADIĞI SİYAHININ ÜZƏRİNDƏ APARILIR.
- `selected = orders.find((o) => o.id === selectedId) ?? null` — DİQQƏTLİ DİZAYN QƏRARI: `selected` (AÇIQ MODALDAKI SİFARİŞ) BİR "SNAPSHOT" KİMİ SAXLANMIR — SADƏCƏ `selectedId` SAXLANIR, `selected`-İN ÖZÜ HƏR RENDER-DƏ `orders`-DAN YENİDƏN TAPILIR (`.find(...)`) — STATUS DƏYİŞDİRİLİB `orders` YENİLƏNƏNDƏ, `selected` DƏ AVTOMATİK TƏZƏ DATanı GÖSTƏRİR.

**`queries/useOrdersData.ts` — siyahı + statistika, İKİ MƏNBƏNİN BİRLƏŞDİRİLMƏSİ:**
```ts
const emptyStats: OrderStats = { TOTAL: 0, DELIVERED: 0, PENDING: 0, PREPARING: 0, CANCELLED: 0, TOTAL_REVENUE: 0 }
type StatusCounts = { TOTAL: number } & Partial<Record<OrderStatus, number>>

export function useOrdersData() {
  const { data: orders = [], isLoading: loading } = useQuery({ queryKey: ['orders'], queryFn: () => listOrders().then((data) => data.map(mapOrderFromApi)) })
  const { data: statsData } = useQuery({ queryKey: ['orderStats'], queryFn: getOrderStats })

  const statusCounts = orders.reduce<StatusCounts>((acc, o) => {
    acc.TOTAL += 1
    acc[o.status] = (acc[o.status] ?? 0) + 1
    return acc
  }, { TOTAL: 0 })
  const stats: OrderStats = { ...emptyStats, ...statsData, ...statusCounts }

  return { orders, loading, stats }
}
```
- **`type StatusCounts = { TOTAL: number } & Partial<Record<OrderStatus, number>>`** — Hissə 3-DƏ İZAH OLUNAN `&` İNTERSECTION: "`TOTAL` MÜTLƏQ VAR, QALAN 5 STATUSUN HƏR BİRİ İSƏ OLA DA BİLƏR, OLMAYA DA" — ÇÜNKİ SİYAHIDA, MƏSƏLƏN, HEÇ BİR `CANCELLED` SİFARİŞ OLMAYA BİLƏR.
- **`orders.reduce<StatusCounts>(...)`** — Hissə 2-DƏKİ `.reduce()`, İNDİ GENERİK İLƏ. `acc[o.status] = (acc[o.status] ?? 0) + 1` — `acc[o.status]` (`Partial` OLDUĞU ÜÇÜN) `number | undefined` OLA BİLƏR, ONA GÖRƏ `?? 0` İLƏ "HƏLƏ SAYILMAYIBSA, 0-DAN BAŞLA" DEYİLİR.
- **NİYƏ BACKEND-İN ÖZ STATİSTİKASINA (`statsData`) DEYİL, SİYAHININ ÜZƏRİNDƏ ÖZÜMÜZ SAYIRIQ?** KODUN ÖZÜNDƏKİ ŞƏRHDƏ İZAH OLUNUB: `/orders/admin/stats` ENDPOİNT-İ HƏR STATUSU ETİBARLI QAYTARMIR (`CANCELLED` XÜSUSİLƏ ÇATIŞMAZ OLA BİLİR, `docs/API.md`-DƏ SƏNƏDLƏŞDİRİLİB) — `orders` ARTIQ TAM (SƏHİFƏLƏNMƏMİŞ) SİYAHI OLDUĞU ÜÇÜN, HƏR STATUSUN SAYINI ONDAN BİRBAŞA HESABLAMAQ DAHA ETİBARLIDIR.
- `stats: OrderStats = { ...emptyStats, ...statsData, ...statusCounts }` — SPREAD-İN "SIRA İLƏ ÜSTƏLƏMƏ" XÜSUSİYYƏTİ: `emptyStats` BÜTÜN AÇARLARI SIFIRLA TƏYİN EDİR, `...statsData` (BACKEND-DƏN, ÇATIŞMAYAN SAHƏLƏRİ OLA BİLƏR) ÜSTƏLƏYİR, SONRA **`...statusCounts` (BİZİM ÖZÜMÜZÜN, DAHA ETİBARLI SAYĞACLARI) SON OLARAQ ÜSTƏLƏYİR** — BACKEND `CANCELLED`-İ ÇATIŞMAZ QAYTARSA BELƏ, BİZİM HESABLADIĞIMIZ QALİB GƏLİR.

**`queries/useOrderMutations.ts` — optimistik status yeniləmə:**
```ts
export function useOrderMutations() {
  const queryClient = useQueryClient()
  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: OrderStatus }) => updateOrderStatus(id, status),
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ['orders'] })
      const previousOrders = queryClient.getQueryData<Order[]>(['orders'])
      queryClient.setQueryData<Order[]>(['orders'], (old) => old?.map((o) => (o.id === id ? { ...o, status } : o)))
      return { previousOrders }
    },
    onError: (_err, _variables, context) => {
      if (context?.previousOrders) queryClient.setQueryData(['orders'], context.previousOrders)
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['orders'] }),
        queryClient.invalidateQueries({ queryKey: ['orderStats'] }),
      ])
      toast.success('Sifariş statusu yeniləndi')
    },
  })

  return { updateStatus: (id: number, status: OrderStatus) => statusMutation.mutate({ id, status }) }
}
```
Bu, **"OPTİMİSTİK YENİLƏMƏ"** (optimistic update) ADLANAN BİR PATTERNDIR — İSTİFADƏÇİ STATUSU DƏYİŞƏN KİMİ, SERVERDƏN CAVAB GƏLMƏMİŞ, EKRAN DƏRHAL YENİLƏNİR (VƏ SERVER XƏTA QAYTARSA, GERİ QAYIDIR):
- `onMutate: async ({ id, status }) => {...}` — MUTASİYA GÖNDƏRİLMƏZDƏN ƏVVƏL İŞƏ DÜŞÜR. `cancelQueries` — HAZIRDA DAVAM EDƏN `['orders']` SORĞUSUNU LƏĞV EDİR (BİZİM "ƏL İLƏ" YENİLƏMƏNİ ÜSTƏLƏMƏSİN DEYƏ). **`getQueryData<Order[]>(['orders'])`** — CACHE-DƏN CARİ DATANI OXUYUR, `<Order[]>` GENERİK OLMASA `unknown` QAYTARARDI (Hissə 3-Ə BAXIN). **`setQueryData<Order[]>(['orders'], (old) => old?.map(...))`** — CACHE-İ DƏRHAL (SERVER CAVABI GƏLMƏMİŞ) YENİLƏYİR. `return { previousOrders }` — TANSTACK QUERY BUNU AVTOMATİK OLARAQ `onError`/`onSuccess`-İN `context` PARAMETRİNƏ "BAĞLAYIR".
- `onError: (_err, _variables, context) => {...}` — XƏTA OLSA, `context?.previousOrders` İLƏ CACHE-İ ƏVVƏLKİ HALINA QAYTARIR (`_`-lə BAŞLAYAN ADLAR — "BU PARAMETRİ QƏSDƏN İŞLƏTMİRƏM" ADƏTİ).
- `onSuccess` — HƏM `['orders']`, HƏM `['orderStats']`-İ YENİDƏN ÇƏKDİRİR (`Promise.all` İLƏ EYNİ ANDA).
- **`mutate` İŞLƏDİLİR, `mutateAsync` YOX** — `updateStatus` `await`/`try-catch` İLƏ NƏTİCƏNİ GÖZLƏMİR, "ATIB-UNUT" KİFAYƏTDİR (OPTİMİSTİK YENİLƏMƏ EKRANI ARTIQ DƏRHAL YENİLƏYİB).

**`constants/statCards.ts` + `constants/statusTextColor.ts`:**
```ts
export const ORDER_STAT_CARDS: OrderStatCardConfig[] = [
  { key: 'TOTAL', label: 'Ümumi sifarişlər', icon: ShoppingCart, color: '#3b82f6' },
  { key: 'TOTAL_REVENUE', label: 'Ümumi satış', icon: DollarSign, color: '#22c55e' },
  // ... 4 status kartı da
]
```
`index.tsx`-DƏKİ `{ORDER_STAT_CARDS.map(...)}` BUNDAN OXUYUR — 6 STATİSTİKA KARTININ HANSI SIRA, ETİKET, İKON VƏ RƏNGLƏ GÖSTƏRİLƏCƏYİNİ BİR YERDƏ SAXLAYIR (`index.tsx`-in özündə YOX — Hissə 4-dəki cədvələ baxın, `constants/` BU SƏHİFƏDƏ Categories-dən DAHA ÇOX məzmun daşıyır).

**`components/OrderDetails.tsx`, `OrderHero.tsx`, `OrderInfoRow.tsx`, `OrderProductsSection.tsx`, `OrderProductRow.tsx`, `OrderStatusSelect.tsx` — NİYƏ AYRI QOVLUQLARDA DEYİL, DÜZ `components/` İÇİNDƏ (Categories-dəki `CategoryForm/` kimi ALT-QOVLUQ YOX)?** HAMISI EYNİ `styles/OrderDetails.module.css`-i PAYLAŞIR (fərqli olaraq, `CategoryForm`/`CategoryDetails` HƏR BİRİNİN ÖZ CSS FAYLI VAR) — bu vəziyyətdə hər birini ayrı qovluğa bölmək əlavə fayda VERMİRDİ, sadəcə əlavə qovluq-atlama xərci olardı.

**BU MODAL İKİ DƏFƏ SONRADAN YENİDƏN İŞLƏNDİ — ƏVVƏLCƏ GÖRÜNÜŞ (dizayn), SONRA STRUKTUR (bölünmə):**

1. **Dizayn:** İlk versiyada `OrderDetails.tsx` sadə, "flat" bir görünüşdə idi — boz fon üzərində sadə `<dl>` siyahısı. SONRADAN, Categories/Products-un detal modallarında olan "hero kart + rəngli ikonlu sətirlər" görünüşünə uyğunlaşdırıldı: yuxarıda qradiyentli bir "hero" kart (sifariş kodu + status), altında hər məlumat (tarix/ünvan/telefon/ödəmə) üçün ayrıca, rəngli ikonlu kart, aşağıda isə məhsul siyahısı — hər məhsul öz kiçik kartında, nömrələnmiş, qiyməti yaşıl "pill" (həb formalı) badge-də.
2. **Struktur:** Yeni dizayn köhnə tək `OrderDetails.tsx` faylını 96 sətrə çatdırdı — ARTIQ OXUNAQLI DEYİLDİ. Categories/Products-un öz-özlüyündə TƏTBİQ ETDİYİ EYNİ MƏNTİQLƏ (Hissə 4-dəki "Səhifə-daxili refactor" bölməsinə baxın), TƏK FƏRQLƏ Kİ BURADA BÜTÖV BİR SƏHİFƏ YOX, TƏK BİR MODAL KOMPONENTİ BÖLÜNÜR — nəticədə `OrderDetails.tsx` (indi ~30 sətir) `OrderHero`/`OrderInfoRow`/`OrderProductsSection`-U BİRLƏŞDİRƏN NAZIK BİR "QABIQ"A ÇEVRİLDİ.

**`OrderDetails.tsx` — indi sadəcə "qabıq":**
```tsx
export default function OrderDetails({ order, onClose, onStatusChange }: OrderDetailsProps) {
  return (
    <Modal open={!!order} onClose={onClose} title="Sifariş məlumatları" wide className={styles.wideModal}>
      {order && (
        <div>
          <OrderHero order={order} onStatusChange={onStatusChange} />
          <div className={styles.detailList}>
            <OrderInfoRow icon={MapPin} color="amber" label="Çatdırılma Ünvanı" value={order.address} />
            <div className={styles.infoGrid}>
              <OrderInfoRow icon={Calendar} color="blue" label="Tarix" value={order.date} />
              <OrderInfoRow icon={Phone} color="purple" label="Telefon" value={order.phone} />
              <OrderInfoRow icon={CreditCard} color="green" label="Ödəmə Metodu" value={order.paymentMethod} />
            </div>
          </div>
          <OrderProductsSection items={order.items} freeShipping={order.freeShipping} />
        </div>
      )}
    </Modal>
  )
}
```
- **`wide className={styles.wideModal}`** — `Modal.tsx`-in yeni `className` prop-u (yuxarıda, `Modal.tsx` bölməsinə baxın) BURADA İŞLƏDİLİR — Orders-in modalı `.wideModal { max-width: 660px }` İLƏ DİGƏR BÜTÜN `wide` MODALLARDAN (560px) GENİŞDİR, AMMA PAYLAŞILAN `.cardWide` SİNİFİNƏ TOXUNULMADAN.
- **DÖRD DƏFƏ TƏKRARLANAN `<OrderInfoRow icon={...} color={...} label="..." value={...} />`** — Hissə 2-DƏ İZAH OLUNAN "TƏKRARLANAN KODU BİR KOMPONENTƏ ÇIXAR" PRİNSİPİNİN KONKRET MİSALIDIR: köhnə versiyada bu 4 sətir, HƏR BİRİ 8-9 SƏTİRLİK, TAM EYNİ FORMALI (ikon+etiket+dəyər) JSX BLOKU İDİ — indi tək bir `OrderInfoRow` komponenti 4 DƏFƏ FƏRQLİ PROP-LARLA ÇAĞIRILIR.
- **`Çatdırılma Ünvanı` TƏK BAŞINA, QALAN ÜÇÜ (`Tarix`/`Telefon`/`Ödəmə Metodu`) İSƏ `.infoGrid` (3 SÜTUNLU GRID) İÇİNDƏ** — ÜNVAN ADƏTƏN UZUN MƏTN OLDUĞU ÜÇÜN ÖZ TAM-EN SƏTRİNDƏ QALIR, QALAN ÜÇÜ İSƏ QISA OLDUĞU ÜÇÜN YAN-YANA SIĞIR — BU, MODALIN HÜNDÜRLÜYÜNÜ AZALDAN, EKRANA "SIĞMAMA" PROBLEMİNİ HƏLL EDƏN KONKRET DÜZƏLİŞDİR (`Modal.tsx`-in ÖZÜNDƏ ARTIQ SCROLL DA VAR, AMMA DAHA QISA MODAL HƏR ZAMAN YAXŞIDIR).

**`OrderHero.tsx` — yuxarı "hero" kart (`OrderHeroProps`: `order` + `onStatusChange`):**
```tsx
export default function OrderHero({ order, onStatusChange }: OrderHeroProps) {
  return (
    <div className={`flex items-center justify-between flex-wrap gap-3 ${styles.hero}`}>
      <div className="flex items-center gap-3">
        <span
          className={`flex items-center justify-center ${styles.statusDot}`}
          style={{ background: STATUS_TEXT_COLOR[ORDER_STATUS_BADGE_COLOR[order.status]] }}
        >
          {order.status === 'DELIVERED' ? '✓' : '0'}
        </span>
        <span className={styles.orderCode}>{order.orderNumber}</span>
      </div>
      {/* ...status seçici + məbləğ, aşağıda */}
    </div>
  )
}
```
- **`style={{ background: STATUS_TEXT_COLOR[ORDER_STATUS_BADGE_COLOR[order.status]] }}`** — status dairəsi ƏVVƏLLƏR HƏMİŞƏ SABİT YAŞIL İDİ, İNDİ SİFARİŞİN HƏQİQİ STATUSUNA UYĞUN RƏNGLƏNİR (PENDING → kəhrəba, CANCELLED → qırmızı, VƏ S.) — AŞAĞIDA `OrderStatusSelect`-İN ÖZ İZAHINDA GÖRƏCƏYİNİZ EYNİ İKİ-QAT LOOKUP (`STATUS_TEXT_COLOR[ORDER_STATUS_BADGE_COLOR[status]]`) BURADA DA TƏKRAR İŞLƏDİLİR — İKİ FƏRQLİ YERDƏ EYNİ RƏNG MƏNTİQİNİ SAXLAMAQ ƏVƏZİNƏ, EYNİ `constants/statusTextColor.ts`-Ə İSTİNAD EDİLİR.
- `.hero`-nun ÖZÜ (CSS-də) BİR QRADİYENT FON (`linear-gradient(135deg, var(--color-green-bg), var(--color-white))`) VƏ SOLDA 4px-lik YAŞIL BİR "AKSENT ZOLAĞI" (`border-left`) DAŞIYIR — SƏHİFƏNİN BREND RƏNGİNƏ (yaşıl) BAĞLI, SABİT BİR VİZUAL AKSENTDİR (STATUS DAİRƏSİNDƏN FƏRQLİ OLARAQ, HƏR STATUSDA EYNİDİR).

**`OrderInfoRow.tsx` — ən "maraqlı" hissə, CSS-in JS-i ƏVƏZ ETMƏSİ:**
```tsx
export default function OrderInfoRow({ icon: Icon, color, label, value }: OrderInfoRowProps) {
  return (
    <div className={`flex items-center gap-3 ${styles.detailRow}`} data-color={color}>
      <span className={`flex items-center justify-center ${styles.detailIcon}`}>
        <Icon size={15} />
      </span>
      <div className="min-w-0">
        <div className={styles.detailLabel}>{label}</div>
        <div className={styles.detailValue}>{value}</div>
      </div>
    </div>
  )
}
```
Bu komponentin BİRİNCİ versiyası belə İDİ (İNDİ SİLİNİB, YALNIZ MÜQAYİSƏ ÜÇÜN):
```tsx
const ICON_CLASS: Record<OrderInfoRowColor, string> = {
  blue: styles.iconBlue, amber: styles.iconAmber, purple: styles.iconPurple, green: styles.iconGreen,
}
const ACCENT_CLASS: Record<OrderInfoRowColor, string> = {
  blue: styles.accentBlue, amber: styles.accentAmber, purple: styles.accentPurple, green: styles.accentGreen,
}
// ... sonra `${ACCENT_CLASS[color]}` / `${ICON_CLASS[color]}` className-lərdə işlədilirdi
```
- **`data-color={color}` NƏDİR?** HTML ELEMENTİNƏ ƏLAVƏ EDƏ BİLƏCƏYİNİZ, SƏRBƏST (İSTƏNİLƏN AD) BİR ATRİBUTDUR — `class`/`id`-DƏN FƏRQLİ OLARAQ, BRAUZERİN ÖZÜNƏ GÖRƏ HEÇ BİR DAVRANIŞI YOXDUR, SADƏCƏ ELEMENTİN ÜZƏRİNDƏ ÖZ MƏLUMATINIZI "YAPIŞDIRMAQ" ÜÇÜNDÜR. CSS-DƏ İSƏ BUNU BİR SEÇİCİ (selector) KİMİ İŞLƏTMƏK OLUR: `.detailRow[data-color="blue"] { ... }`.
- **NİYƏ BU DƏYİŞİKLİK EDİLDİ?** BİRİNCİ VERSİYADA (`ICON_CLASS`/`ACCENT_CLASS` İKİ `Record` MAP-I) RƏNG SEÇİMİ JS TƏRƏFİNDƏ, KOMPONENTİN ÖZÜNDƏ İDİ — İKİNCİ VERSİYADA İSƏ KOMPONENT SADƏCƏ `data-color={color}` YAZIR, RƏNGİN HANSI CSS QAYDASINA UYĞUN GƏLDİYİNİ TAMAMİLƏ CSS FAYLI HƏLL EDİR:
```css
.detailRow[data-color='blue'] {
  border-left-color: var(--color-blue-text);
}
.detailRow[data-color='blue'] .detailIcon {
  background: var(--color-blue-bg);
  color: var(--color-blue-text);
}
/* ...eyni naxışla 'amber', 'purple', 'green' üçün də */
```
  BU, "RƏNG-SEÇİM MƏNTİQİ HARADA YAŞAMALIDIR?" SUALINA VERİLƏN BİR CAVABDIR — LAYİHƏDƏ ARTIQ BÜTÜN RƏNG/TEMA MƏNTİQİ (design token-lar, qaranlıq rejim, Hissə 17-yə baxın) CSS-DƏ YAŞAYIR, ONA GÖRƏ BU KOMPONENTİN DƏ EYNİ FƏLSƏFƏYƏ UYĞUNLAŞDIRILMASI MƏNTİQLİ SAYILDI.
- **`OrderInfoRowColor`** (`types/order/OrderInfoRowProps.ts`) — `'blue' | 'amber' | 'purple' | 'green'` (Hissə 3-DƏKİ UNION TİP) — `OrderInfoRow`-un `color` PROP-UNUN TİPİDİR, JSX-DƏ `data-color={color}` KİMİ BİRBAŞA STRİNG OLARAQ RENDER OLUNUR.

**`OrderProductsSection.tsx` — "Məhsullar (N)" başlığı + siyahı + çatdırılma qeydi:**
```tsx
export default function OrderProductsSection({ items, freeShipping }: OrderProductsSectionProps) {
  return (
    <div className={styles.productsSection}>
      <h4 className={`flex items-center gap-2 ${styles.detailSectionTitle}`}>
        <ShoppingBag size={15} />
        Məhsullar ({items.length})
      </h4>
      <div className={styles.productsCard}>
        {items.map((item, idx) => (
          <OrderProductRow key={idx} item={item} index={idx} />
        ))}
      </div>
      <div className={styles.shippingNote}>Çatdırılma: {freeShipping ? 'Pulsuz' : 'Ödənişli'}</div>
    </div>
  )
}
```
SADƏ BİR "QABIQ" KOMPONENTDİR — ÖZ MƏNTİQİ YOXDUR, `items.map(...)`-Lə HƏR MƏHSULU `OrderProductRow`-A (AŞAĞIDA) ÖTÜRÜR.

**`OrderProductRow.tsx` — hər məhsul indi öz kiçik kartında:**
```tsx
export default function OrderProductRow({ item, index }: OrderProductRowProps) {
  return (
    <div className={`flex items-center gap-3 ${styles.productRow}`}>
      <span className={`flex items-center justify-center ${styles.productIndex}`}>{index + 1}</span>
      <Thumbnail image={item.image} color={item.color} />
      <div className="flex-1 min-w-0">
        <div className={styles.productName}>{item.name}</div>
        <div className={styles.productMeta}>{item.category} · {item.weight}</div>
      </div>
      <div className={`flex flex-col items-end gap-1 ${styles.productPriceWrap}`}>
        <span className={styles.pricePill}>{item.price} ₼</span>
        <span className={styles.productUnit}>{item.unit}</span>
      </div>
    </div>
  )
}
```
- **`index` PROP-U SONRADAN ƏLAVƏ OLUNUB** (`OrderProductRowProps`-A) — `{index + 1}` İLƏ HƏR MƏHSULUN YANINDA KİÇİK BİR NÖMRƏLƏNMİŞ DAİRƏ (`.productIndex`) GÖSTƏRİLİR.
- **QİYMƏT ARTIQ SADƏ MƏTN DEYİL, `.pricePill`** — YAŞIL, "HƏB FORMALI" (pill) BİR BADGE-DİR (`border-radius: 999px`), ADİ MƏTNDƏN DAHA DİQQƏT ÇƏKİR.
- **CSS-DƏ MARAQLI BİR HİSSƏ — `.productRow:nth-child(3n+2)`/`:nth-child(3n+3)`**: HƏR KARTIN SOL TƏRƏFİNDƏ BİR AKSENT ZOLAĞI (`border-left`) VAR, VƏ BU RƏNG 3 RƏNG (YAŞIL/MAVİ/BƏNÖVŞƏYİ) ARASINDA `:nth-child` (Hissə 2-də GEÇMƏYƏN, AMMA CSS-İN ÖZ "N-Cİ UŞAQ" SEÇİCİSİ) İLƏ DÖVR EDİR — SİFARİŞDƏ ÇOX MƏHSUL VARSA, SİYAHI MONOTON GÖRÜNMƏSİN DEYƏ.
- **HOVER QAYDASINDA BİR "TƏLƏ" VAR, DİQQƏTLİ OLUN:** `.productRow:hover` `border-color` SHORTHAND-INI YOX, `border-top-color`/`border-right-color`/`border-bottom-color`-U AYRI-AYRI İŞLƏDİR — ÇÜNKİ `border-color` SHORTHAND-I DÖRD TƏRƏFİN DƏ RƏNGİNİ EYNİ ANDA TƏYİN EDİR, VƏ ÜZƏRİNƏ GƏLƏNDƏ SOL TƏRƏFDƏKİ (YUXARIDA İZAH OLUNAN) AKSENT RƏNGİNİ DƏ BOZA ÇEVİRƏRDİ — BU, ARDINCA TAPILIB DÜZƏLDİLƏN, REAL BİR BUQ İDİ.

```tsx
// OrderStatusSelect.tsx
export default function OrderStatusSelect({ orderId, status, onStatusChange }: OrderStatusSelectProps) {
  return (
    <select value={status} onChange={(e) => onStatusChange(orderId, e.target.value as OrderStatus)}
      style={{ color: STATUS_TEXT_COLOR[ORDER_STATUS_BADGE_COLOR[status]] }}>
      {ORDER_STATUS_OPTIONS.map((s) => <option key={s} value={s}>{ORDER_STATUS_LABELS[s]}</option>)}
    </select>
  )
}
```
- `e.target.value as OrderStatus` — Hissə 3-dəki `as`-a baxın: dropdown `ORDER_STATUS_OPTIONS`-dan quruluduğu üçün TƏHLÜKƏSİZDİR.
- **`STATUS_TEXT_COLOR[ORDER_STATUS_BADGE_COLOR[status]]`** — İKİ QAT LOOKUP: ƏVVƏLCƏ `status` (`"PENDING"`) → `ORDER_STATUS_BADGE_COLOR`-DAN BİR `BadgeColor` (`"amber"`) TAPILIR, SONRA O `BadgeColor` → `constants/statusTextColor.ts`-DƏKİ `STATUS_TEXT_COLOR`-DAN BİR HƏQİQİ CSS RƏNGİ (`var(--color-amber-text)`) TAPILIR. **NİYƏ BİR ADDIMDA YOX?** ÇÜNKİ `"amber"` KİMİ DƏYƏRLƏR **HƏQİQİ CSS RƏNG ADI DEYİL** (`BadgeColor` — Badge komponentinin ÖZ DAXİLİ "KATEQORİYA ADLARIDIR"), ONA GÖRƏ `style={{ color: 'amber' }}` YAZSAQ BRAUZER BUNU TANIMAZ — `STATUS_TEXT_COLOR: Record<BadgeColor, string>` BU İKİSİ ARASINDA "TƏRCÜMƏÇİ" ROLUNU OYNAYIR.

### Cədvəl başlıqlarında sıralama + filtrasiya — tanstack-table-A KEÇİD

Bu, LAYİHƏDƏ ƏLAVƏ EDİLƏN, ƏN BÖYÜK TƏKMİLLƏŞDİRMƏLƏRDƏN BİRİDİR — İSTİFADƏÇİ CƏDVƏLİN HƏR SÜTUNUNDA GÖRÜNƏN İKON CÜTÜNÜN (⇅ VƏ HÜNİ-FORMALI FİLTR İKONU) HƏQİQƏTƏN İŞLƏMƏSİNİ İSTƏDİ. **BU XÜSUSİYYƏT ƏVVƏLCƏ ƏL İLƏ (hand-rolled `useMemo` + `.filter()`/`.sort()` zənciri) YAZILMIŞDI, SONRADAN İSƏ `@tanstack/react-table`-A KÖÇÜRÜLDÜ** — bunun səbəbi, filtr/sıralama sayı artdıqca (4 filtr + sıralama), ƏL İLƏ YAZILAN `filtered`/`sorted` `useMemo` ZƏNCİRİNİN ÖZÜ getdikcə daha çox "boilerplate" (təkrarlanan, öz-özlüyündə maraqsız kod) tələb etməsi idi — tanstack-table bunu (filtrləmə, sıralama, sütun meta-datası) hazır, sınanmış bir modelə həvalə edir.

**Hansı sütun nəyə malikdir (HƏR İKON CÜTÜ EYNİ GÖRÜNSƏ DƏ, HAMISI EYNİ DƏRƏCƏDƏ "HƏQİQİ" DEYİL):**

| Sütun | Sıralama (⇅) | Filtr (hüni ikonu) |
|---|---|---|
| No | ❌ dekorativ | ❌ dekorativ |
| Tarix | ✅ real (xronoloji) | ✅ real (tarix seçici, react-day-picker) |
| Çatdırılma ünvanı | ❌ dekorativ | ❌ dekorativ |
| Məhsul sayı | ✅ real (rəqəm) | ✅ real (3 bucket: 1-5 / 6-10 / 10+) |
| Subtotal/Çatdırılma | ✅ real (məbləğ) | ✅ real (2 bucket: Pulsuz / Ödənişli) |
| Status | ✅ real (enum sırası) | ✅ real (checkbox siyahısı) |
| Əməliyyat | ❌ | ❌ |

**Fayl bölgüsü (`table/` qovluğunun daxili quruluşu):**
```
Orders/table/
├── index.ts                          → OrdersTable + useOrdersTable-i yenidən ixrac edir
├── columns/columnMeta.ts             → tanstack header-larından sadə Column[] qurur
├── columns/widths.ts                 → pinned (sabit) enlər
├── components/OrdersTable.tsx        → cədvəlin özü (Table-a tanstack sətir/hücrələrini verir)
├── components/ColumnHeader.tsx       → checkbox-siyahı filtri (Radix DropdownMenu ilə)
├── components/DateColumnHeader.tsx   → tarix filtri açan düymə (DateFilterCalendar-ı lazy yükləyir)
├── components/DateFilterCalendar.tsx → react-day-picker təqvimi (lazy chunk)
├── components/SortTrigger.tsx        → sıralama oxu (dekorativ/real hər ikisi üçün ortaq)
├── components/columnLabel.tsx        → dekorativ (sıralanmayan/filtrlənməyən) sütun başlığı üçün kiçik köməkçi
├── hooks/useOrdersTable.tsx          → useReactTable qurur, state-ləri idarə edir
├── hooks/useOrderColumnDefs.tsx      → 7 sütunun tanstack "column def"-lərini qurur
└── hooks/useColumnMenu.ts            → aç/bağla + pozisiya + kənara-klikdə-bağla (ColumnHeader/DateColumnHeader ortaq)
```

**`utils/filters.ts` — SAF FUNKSİYALAR (nə state, nə sorğu):**
```ts
export const COUNT_BUCKETS: readonly CountBucket[] = ['1-5', '6-10', '10+']
export const matchesCountBucket = (count: number, bucket: CountBucket) => {
  if (bucket === '1-5') return count >= 1 && count <= 5
  if (bucket === '6-10') return count >= 6 && count <= 10
  return count >= 11
}
export const SHIPPING_BUCKETS: readonly ShippingBucket[] = ['Pulsuz', 'Ödənişli']
export const matchesShipping = (freeShipping: boolean, bucket: ShippingBucket) => bucket === 'Pulsuz' ? freeShipping : !freeShipping

export const toDateInputValue = (iso: string) => { /* yyyy-mm-dd, yerli vaxt getter-ləri ilə */ }
export const parseDateInputValue = (value: string): Date | undefined => { /* tərsi, react-day-picker üçün */ }

export const dateFilterFn: FilterFn<Order> = (row, _columnId, filterValue: string) =>
  filterValue === '' || toDateInputValue(row.original.createdAt) === filterValue
export const statusFilterFn: FilterFn<Order> = (row, _columnId, filterValue: Set<OrderStatus>) =>
  filterValue.size === 0 || filterValue.has(row.original.status)
export const countFilterFn: FilterFn<Order> = (row, _columnId, filterValue: Set<CountBucket>) =>
  filterValue.size === 0 || [...filterValue].some((b) => matchesCountBucket(row.original.itemCount, b))
export const shippingFilterFn: FilterFn<Order> = (row, _columnId, filterValue: Set<ShippingBucket>) =>
  filterValue.size === 0 || [...filterValue].some((b) => matchesShipping(row.original.freeShipping, b))
export const globalFilterFn: FilterFn<Order> = (row, _columnId, filterValue: string) =>
  `${row.original.orderNumber} ${row.original.address}`.toLocaleLowerCase('az').includes(filterValue.toLocaleLowerCase('az'))
```
- **`FilterFn<Order>`** — tanstack-table-IN ÖZ TİPİDİR: "`(sətir, sütun-ID-si, filtr-dəyəri) => boolean` FORMASINDA BİR FUNKSİYA, `Order` SƏTİRLƏRİ ÜÇÜN" DEMƏKDİR. HƏR FUNKSİYA "YA HEÇ FİLTR SEÇİLMƏYİB (`size === 0`/`=== ''`, HAMISI KEÇSİN), YA DA BU SƏTİR SEÇİLƏNLƏRDƏN BİRİNƏ UYĞUNDUR" NÜMUNƏSİNİ TƏKRARLAYIR — BU, ƏVVƏLKİ ƏL-İLƏ-YAZILMIŞ `filtered.filter(...)` ZƏNCİRİNİN, İNDİ HƏR SÜTUNUN ÖZ `filterFn`-İNƏ "BÖLÜNMÜŞ" HALIDIR.
- **`toDateInputValue`/`parseDateInputValue` NİYƏ `toISOString()` DEYİL, YERLİ (LOCAL) GETTER-LƏRLƏ?** KODUN ÖZÜNDƏKİ ŞƏRHDƏ İZAH OLUNUB: `toISOString()` UTC-YƏ GÖRƏDİR VƏ İSTİFADƏÇİNİN VAXT ZONASINDA GECƏ YARISINA YAXIN SAATLARDA TARİXİ BİR GÜN "SÜRÜŞDÜRƏ" BİLƏR — BU DA, GÖSTƏRİLƏN `date` İLƏ FİLTRİN NƏTİCƏSİ ARASINDA UYĞUNSUZLUQ YARADARDI. `parseDateInputValue` İSƏ, EYNİ SƏBƏBDƏN, `new Date(value)` (BARE date-only string-i UTC gecə yarısı kimi parse edər) ƏVƏZİNƏ, İL/AY/GÜN KOMPONENTLƏRİNDƏN AYRI-AYRI `Date` QURUR.
- **`globalFilterFn`** — Hissə 17-dəki `LayoutOutletContext`-dən gələn ÜMUMİ AXTARIŞ MƏTNİ ÜÇÜNDÜR, tanstack-a `globalFilterFn` kimi verilir (`useOrdersTable.tsx`-də) — köhnə əl-ilə-yazılmış axtarış filtrinin YERİNİ TUTUR.

**`table/hooks/useOrderColumnDefs.tsx` — 7 sütunun tanstack "column def"-ləri:**
```tsx
export function useOrderColumnDefs({ columnHelper, statusFilter, setStatusFilter, /* ... */ onView }: UseOrderColumnDefsParams) {
  return useMemo(() => [
    columnHelper.display({ id: 'no', header: () => columnLabel('No', styles.noColLabel), cell: (info) => info.row.original.orderNumber, meta: { width: '16%' } }),
    columnHelper.accessor((o) => o.createdAt, {
      id: 'date',
      header: () => dateHeader(dateFilter, setDateFilter, sort, toggleSort),
      cell: (info) => info.row.original.date,
      filterFn: dateFilterFn,
      sortingFn: (a, b) => a.original.createdAt.localeCompare(b.original.createdAt),
      meta: { width: 115 },
    }),
    // ... address (dekorativ), count, subtotal, status (hərəsi öz header/cell funksiyası ilə), action
  ], [columnHelper, statusFilter, dateFilter, countFilter, shippingFilter, sort, onView])
}
```
- **`columnHelper.display(...)` VS `columnHelper.accessor(...)`** — tanstack-table-IN ÖZ AYRIMIDIR: `display` — HEÇ BİR DATA SAHƏSİNƏ "BAĞLI" OLMAYAN sütun (`no`, `action` — sadəcə göstərmək üçün, filtrlənə/sıralana BİLMƏZ); `accessor((o) => o.createdAt, {...})` — DATA-DAN BİR DƏYƏR "ÇIXARAN" (BURADA — SIRALAMA/FİLTR ÜÇÜN LAZIM OLAN XAM DƏYƏR) sütun, İKİNCİ ARQUMENTDƏ İSƏ `filterFn`/`sortingFn` TƏYİN OLUNUR.
- **`sortingFn: (a, b) => a.original.createdAt.localeCompare(b.original.createdAt)` VS `sortingFn: 'basic'`** — Tarix sütunu ÖZ MÜQAYİSƏ FUNKSİYASINI YAZIR (XAM ISO TARİXİN ƏLİFBA SIRASI = DÜZGÜN XRONOLOJİ SIRA, Hissə 5-ə baxın); Məhsul sayı/Subtotal isə `'basic'` (tanstack-un HAZIR, SADƏ ƏDƏD MÜQAYİSƏSİ) İSTİFADƏ EDİR, ÇÜNKİ `accessor`-UN ÖZÜ ARTIQ RƏQƏMİ (`Number(o.subtotal)`) "ÇIXARIB", ƏLAVƏ MƏNTİQƏ EHTİYAC QALMIR.
- **`meta: { width: ... }`** — tanstack-table-in ÖZ SÜTUN TƏRİFİNƏ ƏLAVƏ EDİLƏN, TANSTACK-IN ÖZÜNÜN ANLAMADIĞI, YALNIZ BİZİM `columnMeta.ts`-İN (aşağıda) OXUDUĞU SƏRBƏST BİR SAHƏDİR — Bu, `Column`-un (Hissə 5) `width` sahəsini, tanstack-in öz DÜNYASINA "DAŞIMAĞIN" YOLUDUR.
- NİYƏ BU FAYL `useOrdersTable.tsx`-DƏN AYRI ÇIXARILIB? KODUN ÖZÜNDƏKİ ŞƏRHDƏ QEYD OLUNUB: BU, `useOrdersTable.tsx`-in BÖYÜK ƏKSƏRİYYƏTİNİ TƏŞKİL EDİRDİ VƏ ÖZ-ÖZLÜYÜNDƏ (VERİLƏN state-lə) TAMAM MÜSTƏQİLDİR.

**SONRADAN, BU FAYLIN ÖZÜ DƏ (155 SƏTİRDƏN) 99 SƏTRƏ ENDİRİLDİ — `header`/`cell` JSX-i İKİ YENİ FAYLA ÇIXARILARAQ:**
- **`table/components/cellRenderers.tsx`** — HƏR SÜTUNUN `cell:` XÜSUSİYYƏTİNDƏKİ JSX-İ, `columnLabel.tsx` İLƏ EYNİ NAXIŞLA (kiçik hərflə başlayan, sadə funksiya, ÖZ `Props` TİPİ TƏLƏB ETMİR), AYRI-AYRI FUNKSİYALARA ÇÖVRİLİB: `countCell(order)`, `subtotalCell(order)`, `statusCell(order)`, `actionCell(order, onView)`. İSTİFADƏSİ: `cell: (info) => statusCell(info.row.original)`.
- **`table/components/headerRenderers.tsx`** — EYNİ NAXIŞLA, İNDİ DƏ `header:`-DƏKİ JSX ÜÇÜN: `dateHeader(value, onChange, sort, toggleSort)`, `countHeader(...)`, `subtotalHeader(...)`, `statusHeader(...)` — HƏR BİRİ ÖZ `DateColumnHeader`/`ColumnHeader` ÇAĞIRIŞINI BƏLƏDLƏYİR. İSTİFADƏSİ: `header: () => statusHeader(statusFilter, setStatusFilter, sort, toggleSort)`.
- **NİYƏ İKİ AYRI FAYL, TƏK FAYL YOX?** `cell`-LƏR SAF GÖRÜNTÜ FUNKSİYALARIDIR (`(order: Order) => JSX`, sadəcə DATA GÖSTƏRİR), `header`-LƏR İSƏ İNTERAKTİVDİR (`(value, onChange, sort, toggleSort) => JSX`, filtr/sıralama STATE-İNƏ BAĞLIDIR) — FƏRQLİ FORMALARI OLDUĞU ÜÇÜN AYRI SAXLANIB, EYNİ SƏBƏBLƏ `ColumnHeader.tsx`/`DateColumnHeader.tsx`/`SortTrigger.tsx` DA ARTIQ AYRI FAYLLARDIR.
- Bu, Hissə 4-dəki "Səhifə-daxili refactor" MƏNTİQİNİN, TƏK BİR HOOK-UN İÇİNDƏ TƏKRARLANMASIDIR — FƏRQ, BURADA BÖLÜNƏN ŞEYİN BÜTÖV BİR SƏHİFƏ YOX, TƏK BİR `useMemo` MASSİVİ OLMASIDIR.

**`table/hooks/useOrdersTable.tsx` — hər şeyi bir yerə yığan hook:**
```tsx
export function useOrdersTable(orders: Order[], search: string, onView: (id: number) => void) {
  const [statusFilter, setStatusFilter] = useState<Set<OrderStatus>>(new Set())
  const [dateFilter, setDateFilter] = useState('')
  const [countFilter, setCountFilter] = useState<Set<CountBucket>>(new Set())
  const [shippingFilter, setShippingFilter] = useState<Set<ShippingBucket>>(new Set())
  const [sort, setSort] = useState<SortState>(null)

  const toggleSort = (key: SortKey) => {
    setSort((current) => {
      if (current?.key !== key) return { key, dir: 'asc' }
      if (current.dir === 'asc') return { key, dir: 'desc' }
      return null
    })
  }

  const columnHelper = useMemo(() => createColumnHelper<Order>(), [])
  const tableColumnDefs = useOrderColumnDefs({ columnHelper, statusFilter, setStatusFilter, /* ... */ onView })

  const columnFilters = useMemo<ColumnFiltersState>(() => [
    { id: 'status', value: statusFilter }, { id: 'date', value: dateFilter },
    { id: 'count', value: countFilter }, { id: 'subtotal', value: shippingFilter },
  ], [statusFilter, dateFilter, countFilter, shippingFilter])
  const sortingState = useMemo<SortingState>(() => (sort ? [{ id: sort.key, desc: sort.dir === 'desc' }] : []), [sort])

  const table = useReactTable({
    data: orders,
    columns: tableColumnDefs,
    state: { columnFilters, sorting: sortingState, globalFilter: search },
    globalFilterFn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const rows = table.getRowModel().rows
  const columns: Column[] = buildColumnMeta(table.getHeaderGroups()[0]!.headers)
  return { table, rows, columns }
}
```
- **`useState<Set<OrderStatus>>(new Set())` VƏ S. — NİYƏ MASSİV (`[]`) YOX, `Set`?** `Set`-İN `.has(x)` METODU MASSİVİN `.includes(x)`-İNDƏN DAHA SÜRƏTLİDİR, VƏ TƏKRARLANAN ELEMENTLƏRƏ QARŞI TƏBİİ OLARAQ MÜHAFİZƏLİDİR.
- **`toggleSort(key: SortKey)`** — ÜÇ-VƏZİYYƏTLİ BİR "DÖVR" (CYCLE): YOX → ARTAN (`asc`) → AZALAN (`desc`) → YOX → ... `if (current?.key !== key) return { key, dir: 'asc' }` — YA HEÇ SIRALAMA YOXDUR, YA DA BAŞQA SÜTUNA GÖRƏDİR, HƏR İKİ HALDA BU SÜTUNU ARTANDAN BAŞLAT.
- **`createColumnHelper<Order>()`** — tanstack-table-IN GENERİK KÖMƏKÇİSİ (Hissə 3-ə baxın): "BU HELPER-İN QURDUĞU BÜTÜN SÜTUN TƏRİFLƏRİ `Order` SƏTİRLƏRİ ÜÇÜNDÜR" DEYİR — `useOrderColumnDefs`-ə PARAMETR OLARAQ ÖTÜRÜLÜR.
- **`columnFilters: ColumnFiltersState`** — HƏR FİLTRİ (`statusFilter`, `dateFilter` VƏ S.) tanstack-IN GÖZLƏDİYİ `{ id, value }[]` FORMASINA "TƏRCÜMƏ EDİR" — köhnə əl-ilə-yazılmış `&&` zəncirinin yerini bu strukturlaşdırılmış siyahı tutur (hər elementin `filterFn`-i artıq sütunun ÖZ TƏRİFİNDƏDİR, `useOrderColumnDefs`-də).
- **`useReactTable({...})`** — tanstack-table-IN ƏSAS HOOK-UDUR: `data`+`columns` ALIR, `getCoreRowModel`/`getFilteredRowModel`/`getSortedRowModel` isə "BU FUNKSİYALARI TƏTBİQ ET" DEYİR (tanstack-DA BUNLAR OPSİONALDIR — TƏK CƏDVƏL ÜÇÜN SADƏCƏ `getCoreRowModel` KİFAYƏT EDƏR, FİLTR/SIRALAMA İSTƏNİRSƏ, ONLARIN ÖZLƏRİ AYRICA "QOŞULMALIDIR").
- **`buildColumnMeta(table.getHeaderGroups()[0]!.headers)`** — AŞAĞIDA, `columnMeta.ts`-DƏ.

**`table/columns/columnMeta.ts` — tanstack-in HEADER-lərindən sadə `Column[]` qurmaq:**
```ts
const ALIGN_OVERRIDES: Partial<Record<string, 'left' | 'center'>> = { no: 'left', count: 'center' }

export function buildColumnMeta(headers: Header<Order, unknown>[]): Column[] {
  let pinnedTotal = 0
  for (const width of Object.values(PINNED_WIDTHS)) pinnedTotal += width ?? 0
  const remainingColumnCount = headers.length - Object.keys(PINNED_WIDTHS).length
  const restWidth = `${((100 - pinnedTotal) / remainingColumnCount).toFixed(2)}%`

  return headers.map((header) => {
    const pinnedWidth = PINNED_WIDTHS[header.id]
    return {
      key: header.id,
      label: header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext()),
      width: pinnedWidth !== undefined ? `${pinnedWidth}%` : restWidth,
      align: ALIGN_OVERRIDES[header.id],
    }
  })
}
```
- **NİYƏ BU FUNKSİYA LAZIMDIR?** SHARED `Table` KOMPONENTİ (Hissə 14) tanstack-table-DAN TAMAMİLƏ XƏBƏRSİZDİR — O SADƏCƏ `Column[]` (Hissə 5) İSTƏYİR. Bu funksiya, tanstack-in ÖZ "header group"-UNU (`table.getHeaderGroups()[0]!.headers`), `Table`-in ANLADIĞI SADƏ FORMAYA ÇEVİRİR — BELƏLİKLƏ, `Table` KOMPONENTİ "KİTABXANA-AGNOSTİK" (hansı cədvəl kitabxanası işlədilməsindən asılı olmayan) QALIR, TANSTACK-A YALNIZ Orders bilir.
- **`flexRender(header.column.columnDef.header, header.getContext())`** — tanstack-in ÖZ FUNKSİYASI: SÜTUN TƏRİFİNDƏKİ `header` (BİR JSX QAYTARAN FUNKSİYA OLA BİLƏR, `useOrderColumnDefs`-DƏ GÖRDÜYÜMÜZ `<DateColumnHeader .../>` KİMİ) İLƏ, HƏMİN SÜTUNUN "KONTEKSTİNİ" (`getContext()`) BİRLƏŞDİRİB, ƏSL RENDER OLUNA BİLƏN NƏTİCƏNİ QAYTARIR.
- **`PINNED_WIDTHS` (`columns/widths.ts`-dən) VS "QALAN" ENLƏR** — `count`/`address`/`subtotal` SABİT FAİZLƏRƏ "SANCILIB" (pinned), QALAN SÜTUNLAR İSƏ QALAN FAİZİ BƏRABƏR BÖLÜR — BU HESABLAMA (`remainingColumnCount`, `headers.length`-DƏN ASILI OLDUĞU ÜÇÜN) `widths.ts`-İN ÖZÜNDƏ EDİLƏ BİLMƏZ (STATİK DEYİL), ONA GÖRƏ `columnMeta.ts`-DƏ, RENDER ZAMANI HESABLANIR.
- **`ALIGN_OVERRIDES`** — Hissə 5-dəki YENİ `Column.align` sahəsinin İSTİFADƏ EDİLDİYİ YERDİR — SİRA NÖMRƏSİ (`no`) VƏ MƏHSUL SAYI (`count`) SÜTUNLARI, DİGƏR SƏHİFƏLƏRDƏKİ KİMİ MƏRKƏZDƏ YOX, FƏRQLİ HİZALANIR.

**`table/components/ColumnHeader.tsx` — checkbox-siyahı filtri, Radix DropdownMenu ilə:**
```tsx
export function ColumnHeader<T extends string>({ label, options, getOptionLabel = (option) => option, value, onChange, sortDir, onSortClick, centered }: ColumnHeaderProps<T>) {
  const [search, setSearch] = useState('')
  const filteredOptions = options.filter((option) => getOptionLabel(option).toLocaleLowerCase('az').includes(search.toLocaleLowerCase('az')))
  const toggle = (option: T) => {
    const next = new Set(value)
    if (next.has(option)) next.delete(option); else next.add(option)
    onChange(next)
  }
  return (
    <span className={styles.colLabel}>
      {label}
      <SortTrigger label={label} sortDir={sortDir} onClick={onSortClick} />
      <DropdownMenu.Root onOpenChange={(next) => !next && setSearch('')}>
        <DropdownMenu.Trigger asChild><button className={value.size > 0 ? styles.filterActive : ''}><Filter size={16} /></button></DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content align="end" sideOffset={4}>
            <input value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.stopPropagation()} placeholder="Axtar..." />
            {filteredOptions.map((option) => (
              <DropdownMenu.CheckboxItem key={option} checked={value.has(option)} onCheckedChange={() => toggle(option)} onSelect={(e) => e.preventDefault()}>
                {getOptionLabel(option)}
              </DropdownMenu.CheckboxItem>
            ))}
            {value.size > 0 && <DropdownMenu.Item onSelect={() => onChange(new Set())}>Təmizlə</DropdownMenu.Item>}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </span>
  )
}
```
- **`<T extends string>`** — Hissə 3-dəki GENERİK, BİR MƏHDUDİYYƏTLƏ (`extends string`): `Set<T>`-in dəyərləri JSX-də `key={option}` VƏ MƏTN KİMİ GÖSTƏRİLDİYİ ÜÇÜN, `T` SADƏCƏ "İSTƏNİLƏN ŞEY" OLA BİLMƏZ. BU KOMPONENT ÜÇ FƏRQLİ YERDƏ, ÜÇ FƏRQLİ `T` İLƏ ÇAĞIRILIR: `ColumnHeader<OrderStatus>`, `ColumnHeader<CountBucket>`, `ColumnHeader<ShippingBucket>` (`useOrderColumnDefs.tsx`-də).
- **`centered` PROP-U VƏ BİR REAL BUQ:** `Məhsul sayı` SÜTUNU YEGANƏSİDİR Kİ `centered` VERİR — BAŞLIQ (ETİKET + SIRALAMA İKONU + FİLTR İKONU) MƏRKƏZLƏŞDİRİLİR. AMMA BU SÜTUN ÇOX DAR İDİ (CƏMİ 10%, `table/columns/widths.ts`-DƏKİ `COUNT_WIDTH`), VƏ SHARED `Table`-in `<th>`-İNİN SOLDAN PADDİNQ-İ SIFIRDIR (Hissə 14-Ə BAXIN) — NƏTİCƏDƏ, MƏRKƏZLƏŞDİRİLMİŞ MƏZMUN SÜTUNDAN GENİŞ OLDUĞUNDA, HƏR İKİ KƏNARDAN BİR AZ "KƏSİLİRDİ" (HƏRFİN YARISI GÖRÜNMÜRDÜ). DÜZƏLİŞ İKİ HİSSƏLİ İDİ: (1) `COUNT_WIDTH` 10-DAN **14**-ə QALDIRILDI (ƏSAS DÜZƏLİŞ — SÜTUN SADƏCƏ ÖZ MƏZMUNU ÜÇÜN DAR İDİ), (2) `ColumnHeader.tsx`-in ÖZÜNƏ, `centered` DOĞRU OLANDA, KİÇİK BİR YAN PADDİNQ VERƏN `.colLabelCentered` SİNİFİ ƏLAVƏ OLUNDU (`OrdersTable.module.css`) — TƏHLÜKƏSİZLİK MARGİNİ KİMİ. **DƏRS: PADDİNQ TƏK BAŞINA HƏLL DEYİL** — MƏZMUN SÜTUNDAN HƏQİQƏTƏN GENİŞSƏ, PADDİNQ ONU YENƏ DƏ KƏSƏR, ONA GÖRƏ ƏSL DÜZƏLİŞ HƏMİŞƏ SÜTUNU KİFAYƏT QƏDƏR GENİŞ ETMƏKDİR.
- **NİYƏ ARTIQ ÖZ `createPortal`/`useColumnMenu` ÇAĞIRIŞI YOX, `DropdownMenu.Root`/`Trigger`/`Portal`/`Content`?** BU, @radix-ui/react-dropdown-menu-A KEÇİDDİR (Hissə 1-ə baxın) — ƏVVƏLKİ VERSİYADA (AŞAĞIDA GÖRƏCƏYİMİZ `DateColumnHeader` KİMİ) BU KOMPONENT ÖZÜ `useColumnMenu` (aç/bağla/pozisiya/kənara-klik) İŞLƏDİRDİ; İNDİ İSƏ, CHECKBOX SİYAHISI ÜÇÜN, ƏLÇATANLIQ (KLAVİATURA İLƏ NAVİQASİYA, FOKUS TƏLƏSİ) DAHA VACİB OLDUĞUNDAN, RADİX-İN HAZIR PRİMİTİVLƏRİNƏ KEÇİLİB — `DateColumnHeader` İSƏ (BİR TƏQVİM AÇAN, SADƏCƏ BİR DÜYMƏ OLDUĞU ÜÇÜN) HƏLƏ DƏ ÖZ `useColumnMenu`-SUNU İŞLƏDİR. **BU, İKİ FƏRQLİ HƏLLİN EYNİ FAYLDA YAŞAMASININ SƏBƏBİDİR** — İKİSİ DƏ DÜZGÜNDÜR, SEÇİM MENYUNUN NÖVÜNƏ (SİYAHI VS TƏQVİM) GÖRƏ EDİLİB.
- `getOptionLabel?: (option: T) => string`, DEFAULT `(option) => option` — Hissə 2-DƏKİ DESTRUCTURING DEFAULT DƏYƏRLƏRİNƏ BAXIN: `Status` ÜÇÜN `(s) => ORDER_STATUS_LABELS[s]` VERİLİR, `Məhsul sayı`/`Subtotal` ÜÇÜN İSƏ DEFAULT KİFAYƏT EDİR (`'1-5'`/`'Pulsuz'` ARTIQ ÖZÜ OXUNAQLIDIR).
- **`centered?: boolean` PROP-U — NİYƏ LAZIM OLDU?** "Məhsul sayı" SÜTUNUNUN XANALARINI (`<td>`) ORTALAMAQ ÜÇÜN, ƏVVƏLCƏ SADƏCƏ `<td>`-NİN ÖZÜNƏ `text-align: center` VERİLİB, AMMA İŞLƏMƏYİB — SƏBƏBİ: `ColumnHeader`-İN KÖK ELEMENTİ (`<span>`) TAILWIND-İN `flex` KLASI İLƏ "BLOK SƏVİYYƏLİ" (block-level) BİR QUTUDUR, VƏ CSS-İN ÖZ QAYDASINA GÖRƏ BLOK QUTULAR ATA ELEMENTİN `text-align`-INI "EŞİTMİR" (`text-align` YALNIZ INLINE MƏZMUNA TƏSİR EDİR) — ONA GÖRƏ MƏRKƏZLƏŞDİRMƏ BAŞLIQ XANASINDA HEÇ VAXT İŞLƏMİRDİ. HƏLL: `ColumnHeader`-Ə `centered` PROP-U ƏLAVƏ EDİLİB, O DA ÖZ DAXİLİ `<span>`-Ə `justify-center` KLASINI ƏLAVƏ EDİR — MƏRKƏZLƏŞDİRMƏ, ATA ELEMENTİN `text-align`-INDƏN ASILI OLMADAN, KOMPONENTİN ÖZ DAXİLİNDƏ HƏLL OLUNUR. YALNIZ "Məhsul sayı" BUNU `true` VERİR.
- **`table/components/columnLabel.tsx` NİYƏ AYRI BİR FAYLDADIR (BİR KOMPONENTİN İÇİNDƏ YOX)?** BU, JSX QAYTARAN, AMMA ADLANDIRMA QAYDASINA GÖRƏ (BÖYÜK HƏRFLƏ BAŞLAMADIĞI ÜÇÜN) "KOMPONENT" SAYILMAYAN SADƏ BİR FUNKSİYADIR (`No`/`Çatdırılma ünvanı` KİMİ DEKORATİV BAŞLIQLAR ÜÇÜN). ÖZ FAYLINA ÇIXARILMASININ SƏBƏBİ TypeScript-Ə DEYİL, `oxlint`-İN (Hissə 20-Ə BAXIN) `react-refresh/only-export-components` QAYDASINA GÖRƏDİR — BU QAYDA, BİR FAYLIN YALNIZ KOMPONENTLƏR İXRAC ETMƏSİNİ TƏLƏB EDİR (Kİ "FAST REFRESH" — KOD DƏYİŞƏNDƏ SƏHİFƏNİN TAM YENİLƏNMƏDƏN, YALNIZ DƏYİŞƏN HİSSƏNİN "İSTİ" (hot) YENİLƏNMƏSİ — DÜZGÜN İŞLƏSİN) — BAŞQA BİR KOMPONENT FAYLININ İÇİNDƏ BELƏ BİR "ADİ FUNKSİYA" DA İXRAC OLUNSAYDI, BU QAYDA XƏBƏRDARLIQ VERƏRDİ.

**`table/components/DateColumnHeader.tsx` + `DateFilterCalendar.tsx` — tarix filtri, VƏ `React.lazy` ilə bir bundle-ölçüsü optimallaşdırması:**
```tsx
const DateFilterCalendar = lazy(() => import('@/pages/Protected/Orders/table/components/DateFilterCalendar'))

export function DateColumnHeader({ label, value, onChange, sortDir, onSortClick }: DateColumnHeaderProps) {
  const { open, setOpen, pos, triggerRef, menuRef, openMenu } = useColumnMenu(190)
  return (
    <span className={styles.colLabel}>
      {label}
      <SortTrigger label={label} sortDir={sortDir} onClick={onSortClick} />
      <button ref={triggerRef} onClick={() => (open ? setOpen(false) : openMenu())}><Filter size={16} /></button>
      {open && createPortal(
        <div ref={menuRef} style={{ top: pos.top, left: pos.left }}>
          <Suspense fallback={<div>Yüklənir...</div>}>
            <DateFilterCalendar value={value} onChange={onChange} />
          </Suspense>
        </div>,
        document.body,
      )}
    </span>
  )
}
```
```tsx
// DateFilterCalendar.tsx — default export, LAZY olduğu üçün MƏCBURİDİR
export default function DateFilterCalendar({ value, onChange }: DateFilterCalendarProps) {
  return (
    <>
      <DayPicker mode="single" locale={az} selected={parseDateInputValue(value)} onSelect={(date) => onChange(date ? toDateInputValue(date.toISOString()) : '')} weekStartsOn={1} />
      <button onClick={() => onChange(toDateInputValue(new Date().toISOString()))}>Bugün</button>
      {value && <button onClick={() => onChange('')}>Təmizlə</button>}
    </>
  )
}
```
- **`const DateFilterCalendar = lazy(() => import(...))`** — REACT-IN ÖZ `lazy()` FUNKSİYASI: BU KOMPONENTİN KODU (VƏ ONUNLA BİRLİKDƏ, `react-day-picker`-İN ÖZÜ) ARTIQ Orders SƏHİFƏSİNİN İLKİN BUNDLE-INA DAXİL DEYİL — YALNIZ İSTİFADƏÇİ TƏQVİMİ **AÇANDA** (BROWSER AYRICA BİR JS FAYLI ÇƏKİR) YÜKLƏNİR. KODUN ÖZÜNDƏKİ ŞƏRHDƏ QEYD OLUNUB: `react-day-picker` Orders-in bundle-ının ~174 KB-LIQ ÖLÇÜSÜNÜN ÖZƏYİNİ TƏŞKİL EDİRDİ (LAYİHƏDƏKİ ƏN BÖYÜK SƏHİFƏ CHUNK-U), VƏ Orders EYNİ ZAMANDA İSTİFADƏÇİLƏRİN LOGIN-DƏN SONRA İLK GÖRDÜYÜ SƏHİFƏDİR — YƏNİ, HƏR GİRİŞDƏN SONRA, TƏQVİMƏ HEÇ TOXUNULMASA BELƏ, BU 174 KB YÜKLƏNİRDİ.
- **`<Suspense fallback={...}>`** — React-IN ÖZ MEXANİZMİDİR: `lazy` KOMPONENT HƏLƏ YÜKLƏNMƏYİBSƏ, `fallback`-I (BURADA "Yüklənir...") GÖSTƏRİR, YÜKLƏNƏN KİMİ ƏSL KOMPONENTLƏ ƏVƏZ EDİR.
- **NİYƏ `DateFilterCalendar`-IN ÖZÜ `default export`?** `lazy(() => import(...))`-UN ÖZÜ, TEXNİKİ OLARAQ, İDXAL OLUNAN MODULUN `default` İXRACINI GÖZLƏYİR — BU, LAYİHƏDƏ `default export`-UN "MƏCBURİ" OLDUĞU NADİR YERLƏRDƏN BİRİDİR (ADƏTƏN LAYİHƏ NAMED EXPORT-A ÜSTÜNLÜK VERİR, MƏS. `export function DateColumnHeader`).
- **`parseDateInputValue`/`toDateInputValue`** — `utils/filters.ts`-DƏN (yuxarıda izah olundu) — react-day-picker-in `selected`/`onSelect` PROP-LARI İLƏ, LAYİHƏNİN ÖZ `"yyyy-mm-dd"` STRİNG FORMATI ARASINDA "TƏRCÜMƏÇİ".

**`filtered`/`sorted`/`columns` ARTIQ SƏHİFƏDƏ (`Orders`) DEYİL, HAMISI `useOrdersTable` HOOK-UNUN İÇİNDƏDİR — `index.tsx`-in ÖZÜNDƏ isə sadəcə `const { rows, columns } = useOrdersTable(orders, search, setSelectedId)` GÖRÜNÜR.**

**BU BÖYÜK BÖLMƏNİN ÜMUMİ DƏRSİ:** BİR KOMPONENTƏ YENİ, BİR-BİRİNDƏN ASILI OLMAYAN BİRDƏN ÇOX FİLTR/SIRALAMA ƏLAVƏ EDİLƏNDƏ, HƏR BİRİNİ ƏL İLƏ (TƏKRAR-TƏKRAR EYNİ DROPDOWN/PORTAL KODU YAZARAQ) HƏLL ETMƏK ƏVƏZİNƏ, TANSTACK KİMİ HAZIR BİR CƏDVƏL KİTABXANASINA HƏVALƏ ETMƏK — HƏM KOD TƏKRARINI AZALDIR, HƏM DƏ GENERİKLƏR (`<T extends string>`) SAYƏSİNDƏ HƏR İSTİFADƏDƏ TİP TƏHLÜKƏSİZLİYİNİ SAXLAYIR. VƏ BUNUN ÜZƏRİNƏ, FAYLLARIN `table/columns/`+`table/components/`+`table/hooks/`-Ə BÖLÜNMƏSİ, BU MÜRƏKKƏBLİYİN HEÇ BİRİNİN `index.tsx`-Ə "SIZMAMASINI" TƏMİN EDİR.

### `src/pages/Protected/Users/` — ƏN SADƏ SƏHİFƏ, ONA GÖRƏ ƏN AZ QOVLUQ

BU SƏHİFƏ TAMAMİLƏ **OXUMAQ ÜÇÜNDÜR** — YARATMA, DÜZƏLTMƏ, SİLMƏ YOXDUR (BACKEND-DƏ BELƏ ENDPOİNT-LƏR DƏ YOXDUR, ONA GÖRƏ `types/user/`-DƏ DƏ `UserForm`/`UserPayload` YOXDUR). **BUNUN NƏTİCƏSİ, QOVLUQ SAYINDA GÖRÜNÜR** — Users-də, DİGƏR 4 SƏHİFƏDƏN FƏRQLİ OLARAQ, NƏ `hooks/`, NƏ `constants/` VAR: MODAL-STATE İDARƏ EDƏCƏK HEÇ NƏ (CRUD YOXDUR) OLMADIĞI ÜÇÜN, `queries/useUsersData.ts` TƏKBAŞINA KİFAYƏT EDİR:
```ts
export function useUsersData(search: string) {
  const { data: users = [], isLoading: loading } = useQuery({ queryKey: ['users'], queryFn: () => listUsers().then((data) => data.map(mapUserFromApi)) })
  const filtered = useMemo(() => users.filter((u) => `${u.name} ${u.phone}`.toLocaleLowerCase('az').includes(search.toLocaleLowerCase('az'))), [users, search])
  const { page, setPage, pageSize, paged } = usePagination(filtered, 7)
  return { loading, filtered, page, setPage, pageSize, paged }
}
```
BU, Categories-DƏKİ `useCategoriesData.ts` İLƏ SƏTİR-SƏTİR EYNİ NÜMUNƏDİR (HƏTTA `usePagination(filtered, 7)`-DƏKİ EYNİ `7` DƏYƏRİ İLƏ). **`index.tsx`-DƏ İSƏ:**
```tsx
export default function Users() {
  useTitle('İstifadəçilər')
  const { search } = useOutletContext<LayoutOutletContext>()
  const { loading, filtered, page, setPage, pageSize, paged } = useUsersData(search)
  const [selected, setSelected] = useState<User | null>(null)

  return (
    <div>
      <h2 className={styles.heading}>İstifadəçilər</h2>
      {loading && <Loading />}
      <UsersTable items={paged} page={page} pageSize={pageSize} loading={loading} onView={setSelected} />
      <UsersPagination page={page} pageSize={pageSize} total={filtered.length} onPageChange={setPage} />
      <UserDetails user={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
```
BİR HOOK ÇAĞIRIŞI (`useUsersData`), BİR "Göstər" DÜYMƏSİ/DETAL MODALI ÜÇÜN `selected: User | null` STATE-İ (BURADA `Orders`-DƏKİ KİMİ ID-YƏ DAYALI DEYİL, TAM BİR `User` OBYEKTİ SAXLANIR — ÇÜNKİ BU SİYAHI HEÇ VAXT MUTASİYA OLUNMUR, DƏYİŞMƏYƏCƏK BİR SİYAHIDA "SNAPSHOT" SAXLAMAQ TAM TƏHLÜKƏSİZDİR). QALAN HƏR ŞEY — `table/columns/`, `table/components/UsersTable.tsx`, `pagination/UsersPagination.tsx`, `components/UserDetails/` — Categories-dəki EYNİ NÜMUNƏLƏRİ TƏKRARLAYIR (Categories-in `CategoryForm`-U OLMADIĞI QƏDƏR SADƏLƏŞDİRİLMİŞ HALDA).

**"Rol" sütununun göstərilməsi (sonradan düzəldilən bir yer):**
```tsx
import { USER_ROLE_LABELS } from '@/lib/constants/userRole'
// ...
<span className={styles.roleBadge}>{USER_ROLE_LABELS[user.role] ?? user.role}</span>
```
İLK VERSİYADA BURADA BİRBAŞA `{user.role}` YAZILIRDI — YƏNİ, CƏDVƏLDƏ XAM, İNGİLİSCƏ `"ADMIN"`/`"COMMERCE"` DƏYƏRLƏRİ GÖRÜNÜRDÜ, HALBUKİ BÜTÜN DİGƏR SƏHİFƏLƏRDƏ (STATUS, MƏHSUL NÖVÜ VƏ S.) HƏR ŞEY AZƏRBAYCANCA ETİKƏTLƏNMİŞDİ. Hissə 11-DƏ İZAH OLUNAN `USER_ROLE_LABELS` LÜĞƏTİ ƏLAVƏ EDİLİB, VƏ CƏDVƏLDƏ (HƏM DƏ DETAL MODALINDA) `USER_ROLE_LABELS[user.role] ?? user.role` YAZILIB — `?? user.role` "TƏHLÜKƏSİZLİK ŞƏBƏKƏSİDİR" (Hissə 2-DƏKİ NULLISH COALESCING): LÜĞƏTDƏ TAPILMAYAN (NƏZƏRİ) BİR ROL GƏLSƏ, HEÇ OLMASA XAM DƏYƏR GÖRÜNSÜN, BOŞ EKRAN YOX.

---

## Hissə 19: CSS Modules

HƏR KOMPONENTİN YANINDA (`Button.tsx` YANINDA `Button.module.css` KİMİ) BİR CSS FAYLI VAR — BU, `shared/components/` VƏ HƏR SƏHİFƏNİN `components/`/`table/components/` ALT-QOVLUQLARI ÜÇÜN DOĞRUDUR. **İSTİSNA: `pages/Protected/` SƏHİFƏLƏRİNİN ÖZÜ** — Hissə 4-də GÖRDÜYÜMÜZ KİMİ, HƏR SƏHİFƏNİN BÜTÜN `.module.css` FAYLLARI (CƏDVƏL, FORMA, DETAL — HAMISI) ARTIQ ÖZ KOMPONENTLƏRİNİN YANINDA DEYİL, TƏK BİR `styles/` QOVLUĞUNDA TOPLANIB (MƏS. `Categories/styles/Categories.module.css`, `CategoriesTable.module.css`, `CategoryForm.module.css`, `CategoryDetails.module.css` — HAMISI BİR YERDƏ, `Categories/table/components/CategoriesTable.tsx`-İN YANINDA DEYİL) — SƏBƏBİ Hissə 4-DƏ İZAH OLUNUB: SƏHİFƏNİN BÜTÜN VİZUAL "SƏTHİNİ" TƏK YERDƏ GÖRMƏK ÜÇÜN.

MİSAL:

```css
/* Button.module.css */
.btn {
  padding: 10px 16px;
  border-radius: 8px;
}
.solid {
  background: var(--color-green);
}
```

```tsx
import styles from './Button.module.css'
<button className={styles.btn}>...</button>
```

**Nə baş verir?** VITE, `.module.css` ADLI FAYLLARI GÖRƏNDƏ, HƏR KLAS ADINI (`.btn`, `.solid`) **UNİKAL BİR ADA** ÇEVİRİR (MƏSƏLƏN `Button-module__btn__x7K2m`) VƏ BUNLARI `styles` ADLI BİR JAVASCRIPT OBYEKTİ KİMİ İXRAC EDİR. BELƏLİKLƏ, BAŞQA BİR FAYLDA DA `.btn` KLASI YAZSANIZ, İKİSİ TOQQUŞMUR.

**TypeScript, `import styles from './Button.module.css'`-Ə NECƏ İCAZƏ VERİR?** ADƏTƏN, TypeScript YALNIZ `.ts`/`.tsx` FAYLLARINI "TANIYIR" — BİR `.css` FAYLINI "İDXAL ETMƏK" ONUN ÜÇÜN QƏRİBƏDİR (TypeScript-in ÖZÜ CSS-İ ANLAMIR). Bu SƏBƏBDƏN, `src/vite-env.d.ts` FAYLINDA (Hissə 20-YƏ BAXIN) BELƏ BİR "AMBIENT" (ORTAQ, HEÇ BİR KONKRET FAYLA AİD OLMAYAN) DEKLARASİYA VAR:
```ts
declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}
```
`declare module '*.module.css'` — Hissə 3-DƏKİ `declare module`-A BAXIN, AMMA BURADA `'axios'` KİMİ KONKRET BİR PAKET YOX, `'*.module.css'` (ULDUZ İŞARƏSİ İLƏ, "BU NÜMUNƏYƏ UYĞUN GƏLƏN İSTƏNİLƏN FAYL") YAZILIB — "`.module.css` İLƏ BİTƏN İSTƏNİLƏN FAYLI İDXAL EDƏNDƏ, NƏTİCƏ BELƏ BİR OBYEKT OLACAQ" DEYİR: `{ readonly [key: string]: string }` — "AÇARLARI İSTƏNİLƏN STRİNG (`btn`, `solid` VƏ S.), DƏYƏRLƏRİ İSƏ HƏMİŞƏ STRİNG (UNİKAL KLAS ADI) OLAN BİR OBYEKT, VƏ BU OBYEKT DƏYİŞDİRİLƏ BİLMƏZ (`readonly`)". Bu, **BİR DƏFƏ, QLOBAL** YAZILIB — HƏR KOMPONENT ÜÇÜN AYRICA `.d.ts` FAYLI YAZMAĞA EHTİYAC YOXDUR.

**`var(--color-green)` NƏDİR?** — `src/index.css`-DƏ TƏYİN OLUNAN CSS DƏYİŞƏNLƏRİDİR (CSS CUSTOM PROPERTIES):
```css
:root {
  --color-green: #7cc576;
  --radius-sm: 8px;
}
```
`var(--color-green)` — BU DƏYİŞƏNİN DƏYƏRİNİ (`#7cc576`) OXUYUR. BÜTÜN RƏNGLƏR/ÖLÇÜLƏR BURADA BİR DƏFƏ TƏYİN OLUNUB, HƏR YERDƏ TƏKRAR YAZMAQ ƏVƏZİNƏ `var(--...)` İLƏ İSTİFADƏ OLUNUR.

**Qaranlıq rejim — MƏHZ NECƏ İŞLƏYİR (`index.css`-in ÖZÜNDƏ):**
```css
:root[data-theme="dark"] {
  color-scheme: dark;
  --color-green-bg: rgba(124, 197, 118, 0.16);
  --color-page-bg: #15171c;
  --color-white: #1e2128;
  --color-text: #d1d5db;
  --color-border: #2a2d34;
  --color-amber-bg: rgba(251, 191, 36, 0.14);
  /* ... digər rənglər eyni nümunə ilə */
}
```
- **BÜTÜN QARANLIQ REJİM, TƏK BİR SELECTOR-DADIR** — Hissə 17-dəki `useThemeStore`-un `applyTheme` funksiyası `<html>`-ə `data-theme="dark"` ATRİBUTU QOYAN KİMİ, BU BLOK AKTİVLƏŞİR VƏ EYNİ DƏYİŞƏN ADLARINI (`--color-page-bg`, `--color-white` VƏ S.) YENİ DƏYƏRLƏRLƏ ÜSTƏLƏYİR — HEÇ BİR KOMPONENT FAYLINA (`.tsx`-lərə DƏ, `.module.css`-LƏRƏ DƏ) TOXUNULMUR, ÇÜNKİ ONLARIN HAMISI ARTIQ `var(--color-...)` İLƏ YAZILIB (BU DA, MƏHZ BUNUN ÜÇÜN, LAYİHƏNİN ƏVVƏLDƏN BƏRİ CSS DƏYİŞƏNLƏRİNƏ RİAYƏT ETMƏSİNİN QAZANCIDIR).
- **`--color-white` ADI DƏYİŞMİR, MƏNASI DƏYİŞİR** — KODUN ÖZÜNDƏKİ ŞƏRHDƏ QEYD OLUNUB: `--color-white`, HƏR YERDƏ ("KART/SƏTH FONU" MƏNASINDA, `Modal`, `Table`, `.main` VƏ S.-DƏ) İŞLƏDİLİR — ADI DƏYİŞMƏDƏN, YALNIZ DƏYƏRİ (`#1e2128`-ə) DƏYİŞDİRMƏK, BÜTÜN BU KOMPONENTLƏRİN, HEÇ BİRİNƏ TOXUNMADAN, QARANLIQ REJİMƏ KEÇMƏSİNƏ İMKAN VERİR.
- **Badge-lərin (`--color-amber-bg` VƏ S.) DÜZ RƏNG YOX, `rgba(..., 0.14)` (YARI-ŞƏFFAF) OLMASI** — İŞIQLI REJİMDƏ BU DƏYİŞƏNLƏR DÜZ, AÇIQ TON RƏNGLƏRDİR (MƏS. AÇIQ SARI FON); QARANLIQ REJİMDƏ İSƏ EYNİ AÇIQ TON, TÜND FONDA "İŞIQLI REJİMDƏN QALAN LƏKƏ" KİMİ GÖRÜNƏRDİ — ONA GÖRƏ, HƏR BADGE RƏNGİNİN ÖZ MƏTN RƏNGİNİN (`--color-amber-text`) YARI-ŞƏFFAF BİR "ÇALARI" (tint) İŞLƏDİLİB — BU, İSTƏNİLƏN TÜND FONDA DÜZGÜN GÖRÜNÜR.
- **`color-scheme: dark`** — BU, CSS-in ÖZ (TypeScript-SİZ) BİR XÜSUSİYYƏTİDİR: BRAUZERƏ "BU SƏHİFƏ QARANLIQ REJİMDƏDİR" DEYİR — BRAUZERİN ÖZ DAXİLİ ELEMENTLƏRİ (MƏS. SCROLLBAR-LAR, `<input type="date">` KİMİ NATİV WIDGET-LƏR) DƏ AVTOMATİK QARANLIQ VARİANTLARINA KEÇİR, HEÇ BİR ƏLAVƏ CSS YAZMADAN.

**Cədvəllərin "içəridə scroll" davranışı (bu, TypeScript-ə aid deyil, sırf CSS-dir, amma tez-tez sual doğurur):** `shared/components/Table/Table.module.css`-də `.scroll` KLASI `flex: 1` VƏ `overflow: auto`-DUR, `<thead>` İSƏ `position: sticky; top: 0`-DIR. BUNUN NƏTİCƏSİ: SƏHİFƏ ÖZÜ (VƏ ONUNLA BİRLİKDƏ SIDEBAR-IN HÜNDÜRLÜYÜ) SABİT QALIR, ARTIQ SƏTİR OLANDA (MƏS. PAGİNASİYADA "10/page" SEÇİLƏNDƏ) CƏDVƏLİN ÖZÜ (SƏHİFƏ YOX) DAXİLDƏ SÜRÜŞDÜRÜLÜR, VƏ SCROLLBAR (SÜRÜŞDÜRMƏ ZOLAĞI) `scrollbar-width: none`/`::-webkit-scrollbar{display:none}` İLƏ GİZLƏDİLİB (SCROLL FUNKSİONAL QALIR, SADƏCƏ VİZUAL ZOLAQ GÖRÜNMÜR). Bu, LAYİHƏDƏ TAPILAN BİR REAL BUG-IN (SƏTIR SAYI ARTANDA SOL TƏRƏFDƏKİ "ÇIXIŞ" DÜYMƏSİNİN YERDƏN-YERƏ SIÇRAMASI) HƏLLİDİR.

**BU MEXANİZMİN ÖZÜ SONRADAN TƏKMİLLƏŞDİRİLİB — `--shell-content-height` (SABİT 640px) ARTIQ MÖVCUD DEYİL.** Köhnə versiyada `.main` (`AdminLayout.module.css`) BİR SABİT CSS DƏYİŞƏNİNƏ (`height: var(--shell-content-height)`) BAĞLI İDİ. İNDİKİ HƏLL FƏRQLİDİR:
```css
.page { display: flex; flex-direction: column; height: 100vh; }
.bodyBar { flex: 1; min-height: 0; }
.main { flex: 1; min-height: 0; max-height: 700px; }
```
- **`.page`-DƏ `min-height: 100vh` ƏVƏZİNƏ `height: 100vh`** — BU, SƏHİFƏNİN ÖZÜNÜN (VƏ `<body>`-İN) HEÇ VAXT HƏQİQİ VIEWPORT-DAN HÜNDÜR OLMAMASINI TƏMİN EDİR (HEÇ BİR CİHAZDA SƏHİFƏ-SƏVİYYƏLİ SCROLL YOXDUR).
- **`.main`-DƏ SABİT `height` ƏVƏZİNƏ `max-height: 700px` + `flex: 1`** — KODUN ÖZÜNDƏKİ ŞƏRHDƏ ƏTRAFLI İZAH OLUNUB: ƏVVƏLCƏ `vh` VAHİDİ (`height: 90vh`) SINANIB, AMMA GERİ QAYTARILIB — `vh` TƏRİFİNƏ GÖRƏ CİHAZIN HƏQİQİ VIEWPORT HÜNDÜRLÜYÜNƏ GÖRƏ MİQYASLANIR, YƏNİ HƏR CİHAZ SİNİFİNDƏ FƏRQLİ PİKSEL HÜNDÜRLÜYÜ VERİRDİ (REAL SCREENSHOT-LARDA GÖRÜLDÜ: BİR CİHAZDA `Pagination`-IN ÜSTÜNDƏ BOŞ SAHƏ, DAHA HÜNDÜR BİR CİHAZDA İSƏ 7 SƏTİRDƏN CƏMİ 4-Ü GÖRÜNÜRDÜ) — MƏQSƏD İSƏ MƏHZ ƏKSİNƏDİR: HƏR CİHAZDA EYNİ GÖRÜNÜŞ. SABİT PİKSEL `max-height` (`flex: 1`-İN ÜZƏRİNƏ QOYULMUŞ BİR "TAVAN") BUNU TƏMİN EDİR — `flex: 1` QISA VIEWPORT-DA HƏLƏ DƏ `.main`-IN KİÇİLMƏSİNƏ İCAZƏ VERİR (KÖHNƏ SABİT-HÜNDÜRLÜK BUQ-UNU TƏKRARLAMADAN), AMMA "TAVAN" HÜNDÜR CİHAZLARDA ONUN LAZIM OLANDAN ARTIQ BÖYÜMƏSİNİN QARŞISINI ALIR (`700px` DƏYƏRİ ƏVVƏLCƏ `646px` İDİ, İSTƏK ƏSASINDA `700px`-Ə QALDIRILIB). ÇOX QISA BİR VIEWPORT-DA (700px-Ə BELƏ ÇATMAYAN) CƏDVƏLİN ÖZ DAXİLİ SCROLL-U (YUXARIDA İZAH OLUNAN, GİZLİ SCROLLBAR-LI) DEVREYƏ GİRİR — BU, İKİ `vh` UĞURSUZLUĞUNDAN DAHA YAXŞI, QAÇINILMAZ BİR ÜÇÜNCÜ HALDIR.

---

## Hissə 20: Tooling

Bu bölmə, LAYİHƏNİN "ARXA PLANDA" İŞLƏYƏN, HEÇ BİR JSX/KOMPONENT OLMAYAN, AMMA BÜTÜN TypeScript/lint/build SİSTEMİNİ İDARƏ EDƏN KONFİQURASİYA FAYLLARINI İZAH EDİR.

### `vite.config.ts`

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (/node_modules\/(react|react-dom|react-router-dom|@tanstack|axios|zustand|sonner|react-hook-form)\//.test(id)) {
            return 'vendor'
          }
        },
      },
    },
  },
})
```
- `plugins: [react(), tailwindcss()]` — Vite-A "React JSX-Ini VƏ Tailwind CSS-İ ANLA" DEYİR.
- `resolve.alias: { '@': ... }` — Hissə 2-DƏ GÖRDÜYÜMÜZ `@/` QISAYOLUNUN VITE ÜÇÜN TƏYİNATI (`tsconfig.json`-DAKI EYNİ QISAYOLLA SİNXRON SAXLANILMALIDIR — İKİSİ AYRI ALƏTDİR, VITE KODU İŞƏ SALIR, TypeScript İSƏ YALNIZ TİPLƏRİ YOXLAYIR, HƏR İKİSİ `@/`-Nİ ÖZ-ÖZLÜYÜNDƏ "TANIMALIDIR").
- **`build.rollupOptions.output.manualChunks` — SONRADAN ƏLAVƏ OLUNAN BİR PERFORMANS TƏKMİLLƏŞDİRMƏSİ:** BUNSUZ, BÜTÜN TƏTBİQİN KODU (REACT-IN ÖZÜ, react-router-dom, TANSTACK QUERY, AXIOS, ZUSTAND, SONNER — VƏ TƏTBİQİN ÖZ KODU) **TƏK BİR BÖYÜK JS FAYLINA** YIĞILIRDI. `manualChunks` FUNKSİYASI, VITE-Ə "HANSI FAYLLARI HANSI PARÇAYA (chunk) QOY" DEYİR: `id` (HAZIRDA EMAL OLUNAN FAYLIN TAM YOLU) REGEX NÜMUNƏSİNƏ (`node_modules/react/`, `node_modules/axios/` VƏ S.) UYĞUN GƏLİRSƏ, O FAYL **`'vendor'`** ADLI AYRI BİR CHUNK-A DÜŞÜR, TƏTBİQİN ÖZ KODU İSƏ AYRI QALIR.
- **BUNUN FAYDASI NƏDİR?** `react`, `axios` KİMİ KİTABXANALAR ÇOX-ÇOX NADİR HALLARDA DƏYİŞİR (YALNIZ `npm update` EDƏNDƏ) — TƏTBİQİN ÖZ KODU İSƏ (BİR SƏHİFƏYƏ KİÇİK BİR DÜZƏLİŞ ETSƏNİZ BELƏ) TEZ-TEZ DƏYİŞİR. ƏGƏR HAMISI TƏK BİR FAYLDA OLSAYDI, KİÇİK BİR DƏYİŞİKLİK BELƏ, İSTİFADƏÇİNİN BRAUZERİNİN BÜTÜN O BÖYÜK FAYLI (VENDOR KİTABXANALAR DAXİL) YENİDƏN ENDİRMƏSİNƏ SƏBƏB OLARDI (BRAUZER KEŞLƏMƏSİ "SINARDI"). İNDİ, VENDOR CHUNK AYRI OLDUĞU ÜÇÜN, TƏTBİQİN ÖZ KODU DƏYİŞƏNDƏ BRAUZER YALNIZ O KİÇİK CHUNK-I YENİDƏN ENDİRİR, VENDOR CHUNK-I ARTIQ KEŞDƏN İSTİFADƏ EDİR (`npm run build` NƏTİCƏSİNDƏ BU, REALDA ÖLÇÜLÜB: APP-KOD CHUNK-I 287 KB-DAN 60 KB-A DÜŞDÜ, VENDOR ÖZÜ 303 KB OLARAQ AYRI QALDI).
- **NİYƏ FUNKSİYA FORMASI, `{ vendor: [...] }` OBYEKT FORMASI YOX?** Klassik Rollup (ƏNƏNƏVİ VERSİYA) `manualChunks: { vendor: ['react', 'axios'] }` KİMİ SADƏ BİR OBYEKT DƏ QƏBUL EDİR — AMMA BU LAYİHƏNİN VITE VERSİYASI **Rolldown** (Rollup-un YENİ, DAHA SÜRƏTLİ, Rust-DA YAZILMIŞ ALTERNATİVİ) ÜZƏRİNDƏ QURULUB, VƏ O, YALNIZ FUNKSİYA FORMASINI QƏBUL EDİR (OBYEKT FORMASI VERSƏNİZ, `TypeError: manualChunks is not a function` XƏTASI VERİR) — ONA GÖRƏ BURADA MƏHZ FUNKSİYA YAZILIB.


### `tsconfig.json`

Bu, TypeScript-in ÖZ AYARLARININ olduğu fayldır. LAYİHƏDƏKİ HƏR `.ts`/`.tsx` FAYL BU AYARLARA GÖRƏ YOXLANILIR:

```jsonc
{
  "compilerOptions": {
    "target": "ES2022",
    "jsx": "react-jsx",
    "allowJs": false,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["src"]
}
```
- `"target": "ES2022"` — TypeScript-in KODU HANSI JavaScript "NƏSLİNƏ" ÇEVİRƏCƏYİNİ BİLDİRİR (KÖHNƏ BRAUZERLƏR ÜÇÜN DAHA ƏSKİ BİR NƏSİL SEÇİLƏ BİLƏRDİ, BU LAYİHƏDƏ MÜASİR BRAUZERLƏR HƏDƏFLƏNDİYİ ÜÇÜN YENİ NƏSİL SEÇİLİB).
- `"jsx": "react-jsx"` — `.tsx` FAYLLARDAKI JSX-İN NECƏ "TƏRCÜMƏ" OLUNACAĞINI BİLDİRİR (React 17+-IN YENİ, `import React` YAZMAĞA EHTİYAC OLMAYAN ÜSULU).
- `"allowJs": false` — **BÜTÜN LAYİHƏ TAM TypeScript-DƏ OLDUĞU ÜÇÜN**, ARTIQ `.js`/`.jsx` FAYLLARINA İCAZƏ VERİLMİR (MİQRASİYA VAXTI, KEÇİD DÖVRÜNDƏ, BU `true` İDİ — HƏM `.js`, HƏM `.ts` FAYLLAR EYNİ ANDA MÖVCUD OLA BİLSİN DEYƏ; İNDİ SON `.jsx` FAYL DA `.tsx`-Ə ÇEVRİLDİKDƏN SONRA `false`-A DƏYİŞDİRİLİB).
- **`"strict": true`** — ƏN VACİB AYARDIR: BİR NEÇƏ AYRI SIXI YOXLAMANI (MƏS. "HEÇ BİR DƏYİŞƏN İMPLİSİT `any` OLA BİLMƏZ", "`null`/`undefined` YOXLANMADAN İSTİFADƏ OLUNA BİLMƏZ" VƏ S.) BİR YERDƏ AKTİV EDİR. BUNSUZ, TypeScript ÇOX DAHA "YUMŞAQ" OLARDI, BƏZİ SƏHVLƏRİ BURAXARDI.
- `"noUncheckedIndexedAccess": true` — Hissə 3-DƏ ƏTRAFLI İZAH OLUNDU.
- `"noImplicitOverride": true` — Hissə 3-DƏ ƏTRAFLI İZAH OLUNDU (`ErrorBoundary`-DƏKİ `override` SÖZLƏRİNİ MƏCBUR EDİR).
- `"paths": { "@/*": ["./src/*"] }` — Hissə 2-DƏ İZAH OLUNAN `@/` QISAYOLUNUN TypeScript ÜÇÜN TƏYİNATI (Vite-in ÖZ `vite.config.ts`-İNDƏ DƏ EYNİ QISAYOL AYRICA TƏYİN OLUNUB, YUXARIDA GÖRDÜK — İKİSİ SİNXRON SAXLANILMALIDIR).

### `.oxlintrc.json`

```jsonc
{
  "plugins": ["react", "oxc", "typescript"],
  "rules": {
    "react/rules-of-hooks": "error",
    "typescript/no-explicit-any": "error",
    "typescript/consistent-type-imports": "warn"
  }
}
```
`oxlint` — Hissə 1-DƏ QEYD OLUNDU, "LİNTER"DİR (ESLint-in SÜRƏTLİ ALTERNATİVİ). `npm run lint` ƏMRİ BUNU İŞƏ SALIR. `"typescript"` PLUGİNİ (`plugins` SİYAHISINDA) SAYƏSİNDƏ, `.ts`/`.tsx` FAYLLARDA XÜSUSİ QAYDALAR AKTİV OLUR: `typescript/no-explicit-any: "error"` — Hissə 3-DƏ İZAH OLUNAN `any` QADAĞASININ MƏHZ BURADA "MƏCBURİLƏŞDİRİLDİYİ" YERDİR (BİRİSİ `any` YAZSA, `npm run lint` ƏMRİ QIRMIZI XƏTA VERƏR). `typescript/consistent-type-imports: "warn"` — `import type`-IN İSTİFADƏSİNİ TÖVSİYƏ EDİR (XƏBƏRDARLIQ SƏVİYYƏSİNDƏ, ÇÜNKİ `tsconfig.json`-DAKI `verbatimModuleSyntax` ARTIQ BUNU TAM MƏCBURİ EDİR — BU QAYDA SADƏCƏ REDAKTORDA DAHA TEZ XƏBƏRDARLIQ VERMƏK ÜÇÜNDÜR).

### `src/vite-env.d.ts`

```ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}
```
- `/// <reference types="vite/client" />` — XÜSUSİ BİR ŞƏRH SƏTRİDİR (ÜÇ SLASH İLƏ BAŞLAYIR), TypeScript-Ə "Vite-İN ÖZÜNÜN TİPLƏRİNİ DƏ BURAYA DAXİL ET" DEYİR (MƏS. `import.meta.hot` KİMİ Vite-Ə XAS ŞEYLƏR ÜÇÜN).
- `interface ImportMetaEnv { readonly VITE_API_BASE_URL: string }` — Hissə 9-DA GÖRDÜYÜMÜZ `import.meta.env.VITE_API_BASE_URL`-İN TİPİNİ TƏYİN EDİR: "`.env` FAYLINDAKI DƏYİŞƏNLƏR ARASINDA, `VITE_API_BASE_URL` ADLI BİR STRİNG VAR (VƏ DƏYİŞDİRİLƏ BİLMƏZ, `readonly`)". BUNSUZ, `import.meta.env.VITE_API_BASE_URL` YAZANDA TypeScript "BELƏ BİR SAHƏ YOXDUR" DEYƏ XƏTA VERƏRDİ.
- `interface ImportMeta { readonly env: ImportMetaEnv }` — `import.meta`-NIN ÖZÜNÜN, `env` ADLI BİR SAHƏYƏ MALİK OLDUĞUNU (VƏ O SAHƏNİN YUXARIDAKI `ImportMetaEnv` FORMASINDA OLDUĞUNU) TƏYİN EDİR.
- `declare module '*.module.css' { ... }` — Hissə 19-DA İZAH OLUNDU.

**`vite-env.d.ts`-in ADINDAKI `.d.ts` NƏ DEMƏKDİR?** `.d.ts` — "DECLARATION FİLE" (DEKLARASİYA FAYLI) DEMƏKDİR: BU FAYLLARDA HEÇ BİR "İCRA OLUNAN" KOD YOXDUR (FUNKSİYA ÇAĞIRILMIR, KOMPONENT RENDER OLUNMUR) — YALNIZ TİP DEKLARASİYALARI VAR. Bu FAYLLAR HEÇ VAXT BROWSER-Ə "GÖNDƏRİLMİR" (BUILD NƏTİCƏSİNDƏ TAMAMİLƏ SİLİNİR), YALNIZ TypeScript-in ÖZÜ ÜÇÜN, KODU YAZARKƏN, "ARXA PLANDA" MÖVCUDDUR.

---

## Hissə 21: Lüğət

| Termin | Mənası |
|---|---|
| **Komponent** | UI-nin bir hissəsini qaytaran funksiya (böyük hərflə başlayır) |
| **Prop** | Komponentə kənardan verilən "parametr" |
| **State** | Komponentin öz "yaddaşı" (`useState`) — dəyişəndə ekran yenilənir |
| **Hook** | `use`-la başlayan funksiya (`useState`, `useEffect`, öz hook-larımız) |
| **JSX** | HTML-ə bənzəyən, JavaScript-ə çevrilən sintaksis |
| **Render** | Komponentin JSX-ini hesablayıb ekrana çıxarmaq prosesi |
| **Route** | Bir URL-ə uyğun gələn səhifə təyinatı |
| **Endpoint** | Backend-in bir konkret ünvanı (məs. `/admin/categories`) |
| **Payload** | Serverə göndərilən data (body) |
| **Adapter** | API formatını UI formatına (və əksinə) çevirən funksiya |
| **Query** | TanStack Query-də data OXUMA əməliyyatı (`useQuery`) |
| **Mutation** | TanStack Query-də data YAZMA əməliyyatı (`useMutation`) |
| **Cache** | Yaddaşda saxlanan, təkrar sorğuya ehtiyacı azaldan data |
| **Invalidate** | Cache-dəki datanı "köhnəlmiş" elan edib yenidən çəkdirmək |
| **Optimistic update** | Server cavabını gözləmədən, ekranı DƏRHAL yeniləmək (xəta olsa geri qaytarılır) |
| **Interceptor** | Hər sorğu/cavabı "ələ keçirib" ortaq məntiq tətbiq edən axios funksiyası |
| **Toast** | Ekranın küncündə görünən, öz-özünə yox olan bildiriş qutucuğu |
| **Debounce** | İstifadəçi fəaliyyəti dayandırdıqdan sonra müəyyən gecikmə ilə davranmaq |
| **Destructuring** | Obyekt/massivdən sahələri ayrıca dəyişənlərə "çıxarmaq" |
| **Spread (`...`)** | Obyekt/massivi "açıb" başqasının içinə tökmək |
| **Rest (`...`)** | Qalan bütün prop/elementləri bir yerə yığmaq |
| **Optional chaining (`?.`)** | "Əgər varsa daxil ol", yoxdursa xəta vermədən `undefined` qaytar |
| **Nullish coalescing (`??`)** | Sol tərəf `null`/`undefined`-dursa sağ tərəfi istifadə et |
| **Ternar operator (`? :`)** | Qısa if/else: `şərt ? doğrudursa : yanlışdırsa` |
| **Async/await** | Asinxron (gecikən) işi "gözləyərək" ardıcıl kodmuş kimi yazmaq üsulu |
| **Promise** | "Gələcəkdə bitəcək iş" təmsil edən JavaScript obyekti |
| **localStorage** | Brauzerin, səhifə bağlansa belə itməyən yaddaşı |
| **CSS Modules** | Hər faylın klas adlarını avtomatik unikal edən CSS sistemi |
| **Controlled input** | Dəyəri tam React state-dən idarə olunan `<input>` |
| **Custom hook** | Öz yazdığımız, `use`-la başlayan, təkrarlanan məntiqi yığan funksiya |
| **Portal** | Bir elementi, React ağacındakı yerindən asılı olmayaraq, DOM-da başqa yerə "işınlamaq" (`createPortal`) |
| **Error Boundary** | Uşaqlarındakı JS xətalarını tutub, bütün tətbiqin çökməsinin qarşısını alan class komponent |
| **Lazy loading** | Bir komponentin kodunu YALNIZ lazım olanda yükləmək (`React.lazy`) |
| **Suspense** | `lazy` komponent yüklənənə qədər nə göstəriləcəyini idarə edən React komponenti |
| **Chunk** | Build zamanı ayrılan kiçik JS fayl parçası |
| **TypeScript** | JavaScript-in üzərinə "tip yoxlaması" əlavə edən dil |
| **Tip (type)** | Bir dəyərin hansı NÖVDƏN (string, number, obyekt formalı və s.) olduğunu bildirən təsvir |
| **`interface`/`type`** | Bir obyektin (və ya digər dəyərin) formasını təyin edən TypeScript sintaksisi |
| **Union (`\|`)** | "Bu, ya bu tip, ya da o tip ola bilər" |
| **Intersection (`&`)** | "Bu, HƏM bu tipin, HƏM DƏ o tipin bütün sahələrinə malikdir" |
| **Generic (`<T>`)** | Bir funksiya/tipin, "hansı tiplə işlədiyindən asılı olmayaraq" eyni cür işləməsi |
| **`unknown`** | "Tipini bilmirəm, amma istifadədən əvvəl MÜTLƏQ yoxlanmalıdır" |
| **`any`** | "İstənilən tip ola bilər, TypeScript heç yoxlamasın" — bu layihədə QADAĞANDIR |
| **`as` (type assertion)** | "Buna etibar et, bu tipdəndir" — runtime yoxlama etmir, yalnız compile vaxtı susdurur |
| **`satisfies`** | `as`-a bənzəyir, amma HƏQİQİ yoxlama aparır, dəyərin öz tipini dəyişmir |
| **Narrowing (daraltma)** | Bir yoxlama (`instanceof`, `typeof`) ilə geniş bir tipi daha dəqiq bir tipə "daraltmaq" |
| **`Record<K, V>`** | Açarları K, dəyərləri V tipindən olan obyekt tipi |
| **`Partial<X>`** | X-in eyni sahələri, amma hamısı opsional (`?`) |
| **`Pick<X, ...>`** | X-dən yalnız qeyd olunan sahələri seçən tip |
| **`keyof typeof`** | Bir obyektin açarlarından avtomatik union tip yaratmaq |
| **`as const`** | Bir dəyəri "sabit, dəyişməz" elan etmək — `keyof typeof` trikinin işləməsi üçün lazımdır |
| **Module augmentation (`declare module`)** | Kənar bir kitabxananın öz tiplərinə, kənardan, əlavə sahə "əlavə etmək" |
| **Tip inference** | TypeScript-in, açıq yazılmasa belə, tipi özü "tapması" |
| **`tsc` / `typecheck`** | TypeScript-in kodu tam yoxlayan əmri (`npm run typecheck`) |
| **`Set`** | Təkrarsız (unikal) dəyərlər saxlayan, `.has()`/`.add()`/`.delete()` metodları olan JS obyekti |
| **Regex (regular expression)** | Bir mətn nümunəsini təsvir edən, mətndə axtarış/əvəzetmə üçün istifadə olunan xüsusi sintaksis |
| **CSS custom property (`--ad`)** | CSS-də bir dəfə təyin olunub, `var(--ad)` ilə hər yerdə istifadə oluna bilən dəyişən |
| **Chunk splitting / vendor bundle** | Build zamanı tez-tez dəyişməyən kitabxanaları (React, axios və s.) tətbiqin öz kodundan ayrı bir JS parçasına bölmək — brauzer keşləməsini yaxşılaşdırır |
| **CDN image resizing** | Şəkil URL-inin özündə ölçü parametri ötürüb, kənar bir xidmətin (bu layihədə Cloudflare) şəkli o ölçüdə hazırlaması |

---

**Son qeyd:** Bu sənəd, kodun HAZIRKI (TypeScript-ə keçdikdən sonrakı) vəziyyətini əks etdirir. Kod dəyişdikcə (yeni səhifə, yeni funksiya, yeni tip əlavə olunduqca) bu sənədin də yenilənməsi lazımdır ki, köhnəlməsin. Xüsusilə: `src/types/`-ə yeni bir resurs faylı əlavə edərkən, Hissə 5-ə də həmin nümunəni (4 tip: `XApi`/`X`/`XForm`/`XPayload`) əlavə edin.
