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
    <div className="flex flex-col gap-3 justify-end min-h-48 bg-[#162329] rounded-xl p-4">
      <p className="text-base font-semibold">
        @{profile.username}, {profile.age}
      </p>
      {profile.gender && <p className="text-sm">{profile.gender}</p>}
      {(profile.horoscope || profile.zodiac) && (
        <div className="inline-flex mt-2 gap-2">
          {profile.horoscope && (
            <div className="backdrop-blur-2xl bg-white/5 py-1.5 px-4 rounded">
              <p className="text-sm font-semibold">{profile.horoscope}</p>
            </div>
          )}
          {profile.zodiac && (
            <div className="backdrop-blur-2xl bg-white/5 py-1.5 px-4 rounded">
              <p className="text-sm font-semibold">{profile.zodiac}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
