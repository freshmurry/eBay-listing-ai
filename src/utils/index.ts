


export function createPageUrl(pageName: string) {
    // Keep the first letter uppercase to match our routing convention
    // Convert from "wizard" or "Wizard" to "/Wizard"
    const capitalizedName = pageName.charAt(0).toUpperCase() + pageName.slice(1).toLowerCase();
    return '/' + capitalizedName.replace(/ /g, '-');
}