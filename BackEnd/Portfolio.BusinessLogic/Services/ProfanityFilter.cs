using System.Text.RegularExpressions;

namespace Portfolio.BusinessLogic.Services
{
    /// <summary>
    /// Lightweight profanity detector. Tokenizes the text and matches whole
    /// words against a small block-list, so it won't false-positive on words
    /// that merely contain a substring (e.g. "assistant"). Used to *flag*
    /// submissions, not to reject them.
    /// </summary>
    public static partial class ProfanityFilter
    {
        private static readonly HashSet<string> BadWords = new(StringComparer.OrdinalIgnoreCase)
        {
            // English
            "fuck", "fucking", "shit", "bitch", "bastard", "asshole", "dick",
            "cunt", "slut", "whore", "nigger", "faggot", "retard", "prick",
            // Romanian
            "pula", "pizda", "muie", "cacat", "futut", "fut", "curva", "bou",
            "prost", "proasta", "dobitoc", "idiot", "imbecil",
        };

        [GeneratedRegex(@"[^\p{L}]+")]
        private static partial Regex TokenSplitter();

        public static bool ContainsProfanity(params string?[] values)
        {
            foreach (var value in values)
            {
                if (string.IsNullOrWhiteSpace(value)) continue;

                var tokens = TokenSplitter().Split(value);
                foreach (var token in tokens)
                {
                    if (token.Length > 0 && BadWords.Contains(token))
                        return true;
                }
            }
            return false;
        }
    }
}
