type Props = {
  profile: {
    age?: number;
    zodiac?: string;
    gender?: string;
    username: string;
    horoscope?: string;
  };
};

// ----------------------------------------------------------------------

export default function CardProfileHighlight({ profile }: Props) {
  return (
    <div className="flex flex-col gap-3 justify-end min-h-48 rounded-xl p-4 relative">
      <div className="bg-[url('/assets/image/bg-profile.png')] bg-cover bg-no-repeat brightness-50 min-h-48 w-full absolute top-0 left-0 right-0 bottom-0 rounded-xl" />
      <p className="text-base font-semibold z-10">
        @{profile.username}, {profile.age! > 0 ? profile.age : ''}
      </p>
      {profile.gender && <p className="text-sm z-10">{profile.gender}</p>}
      {(profile.horoscope || profile.zodiac) && (
        <div className="inline-flex mt-2 gap-2 z-10">
          {profile.horoscope && (
            <div className="backdrop-blur-2xl bg-white/5 py-1.5 px-4 rounded-full">
              <p className="text-sm font-semibold">{profile.horoscope}</p>
            </div>
          )}
          {profile.zodiac && (
            <div className="backdrop-blur-2xl bg-white/5 py-1.5 px-4 rounded-full">
              <p className="text-sm font-semibold">{profile.zodiac}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
