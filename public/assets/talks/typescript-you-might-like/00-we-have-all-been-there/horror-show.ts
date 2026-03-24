// The Ring - Cursed Type System
// "You will die in 7 days... or your type checker will"

type Day1 = { cursed: true };
type Day2 = { cursed: Day1 };
type Day3 = { cursed: Day2 };
type Day4 = { cursed: Day3 };
type Day5 = { cursed: Day4 };
type Day6 = { cursed: Day5 };
type Day7 = { cursed: Day6 };

type WatchTheVideo<T> = T extends Day7
  ? "You have watched the cursed video. Your type system will now suffer eternal recursion."
  : never;

type SpiralOfDeath<
  N extends number,
  Acc extends unknown[] = []
> = Acc["length"] extends N
  ? Acc
  : SpiralOfDeath<N, [WatchTheVideo<Day7>, ...Acc]>;

type Samara<T> = T extends any
  ? {
      crawlThroughTV: Samara<{
        wellOfSorrow: T;
        beforeYouDie: Samara<T>;
        sevenDays: Samara<Samara<Samara<T>>>;
      }>;
    }
  : never;

// The cursed function - hover over the parameter type to see the horror
function watchCursedVideo(
  // Hover over 'victim' to witness the suffering
  victim: Samara<SpiralOfDeath<50>>
): WatchTheVideo<Day7> {
  // @ts-expect-error - The curse cannot be satisfied
  return victim.crawlThroughTV.wellOfSorrow.beforeYouDie.sevenDays;
}

// Attempt to call the cursed function
const cursedTape = {} as Samara<SpiralOfDeath<50>>;

// Hover over this to see your doom
watchCursedVideo(cursedTape);

// Bonus horror: Infinite type instantiation
type TheWell<T = TheWell> = {
  deeper: TheWell<TheWell<T>>;
  darker: T extends TheWell ? TheWell<T> : never;
  drowned: TheWell;
};

// Hover over this for maximum suffering
type SamarasRevenge = TheWell extends { deeper: infer D }
  ? D extends { darker: infer K }
    ? K extends { drowned: infer S }
      ? TheWell<TheWell<TheWell<S>>>
      : never
    : never
  : never;

// The final curse - uncomment at your own risk
// type InstantDeath = SamarasRevenge["deeper"]["darker"]["drowned"]["deeper"]["darker"];